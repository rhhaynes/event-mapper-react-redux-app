# https://www.nhc.noaa.gov/gis/archive_besttrack.php?year=YYYY
require 'json'
require 'nokogiri'
require 'open-uri'
require 'zip'

# == Specify Input Parameters ================================================ #

strm_year = Time.now.year.to_s
file_path = Dir.pwd
save_path = File.join(file_path,'nhc')
Dir.mkdir(save_path) unless Dir.exists?(save_path)

# == Scrape Archived Hurricane Data ========================================== #

# if hurricane data for the current year cannot be found locally, download and
# process zip files from the National Hurricane Center
if !File.file?(File.join(save_path,'al',"hurricanes_al_#{strm_year}.rb"))

  # URL for the National Hurricane Center
  root_url = 'https://www.nhc.noaa.gov'

  # Saffir–Simpson hurricane wind scale (SSHWS)
  # sshws_kn = [34, 64, 83, 96, 113, 137]
  sshws_mph = [39, 74, 96, 111, 130, 157]

  # create temporary directories for zip files
  tmp_path = File.join(file_path,'tmp'); Dir.mkdir(tmp_path) unless Dir.exists?(tmp_path)
  shp_path = File.join( tmp_path,'shp'); Dir.mkdir(shp_path) unless Dir.exists?(shp_path)
  geo_path = File.join( tmp_path,'geo'); Dir.mkdir(geo_path) unless Dir.exists?(geo_path)

  # compile list of hurricanes
  nhc = {:al => [], :ep => []}
  url = root_url + "/gis/archive_besttrack.php?year=#{strm_year}"
  Nokogiri::HTML(open(url)).css('a')
    .select{|link| link['href'] =~ /\S+&year=#{strm_year}&name=.+/}
    .each do |link|
      hid = link.attributes['href'].value[/(?<=id=)(al|ep)\d+/]
      nhc[ hid[/(al|ep)/].to_sym ] << {
        :url => root_url + link.attributes['href'].value.gsub(' ','%20'),
        :zip => nil,
        :hurricane => {
          :hid => hid,
          :year => strm_year,
          :name => link.text.downcase.gsub(/(\b|-)\w/,&:upcase)[/((?<=Cyclone )|(?<=Depression )|(?<=Hurricane )|(?<=Storm )).+/],
          :category => -1,
          :deaths => nil
        },
        :latlng => []
      }
    end

  # compile list of zip files for each hurricane
  nhc.values.each do |hlist|
    hlist.each do |h|
      h[:zip] = Nokogiri::HTML(open(h[:url])).css('a')
        .select{|link| link['href'] =~ /\S+_best_track.zip/}
        .collect{|link| root_url + '/gis/' + link.attributes['href'].value}
    end
  end

  # open zip files in memory, extract select shapefiles, convert to geojson
  nhc.values.each do |hlist|
    hlist.each do |h|
      h[:zip].each do |zurl|
        Zip::File.open_buffer(open(zurl)) do |zipfile|
          zipfile.glob('*_pts.*').each{|file| zipfile.extract(file, File.join(shp_path,file.name))}
          if !zipfile.glob('*_pts.shp').empty?
            zipname = zipfile.glob('*_pts.shp').first.name.split('.')[0..-2].join('.')
            shpfile = File.join(shp_path, zipname + '.shp')
            geofile = File.join(geo_path, zipname + '.geojson')
            %x[ ogr2ogr -f GeoJSON -t_srs EPSG:4326 #{geofile} #{shpfile} ]
            # compile geolocation data for hurricane
            JSON.parse(File.read(geofile))['features'].each do |pt|
              h[:latlng] << {
                :date => pt['properties']['DTG'].to_s[0..7],
                :time_utc => pt['properties']['HHMM'],
                :lat => pt['properties']['LAT'],
                :lng => pt['properties']['LON'],
                :wind_mph => (pt['properties']['INTENSITY'] * 1.150779).round.to_s
              }
              cat = sshws_mph.each_index.select{|i| sshws_mph[i] < h[:latlng][-1][:wind_mph].to_f}.max || -1
              h[:hurricane][:category] = cat if cat > h[:hurricane][:category]
            end
          end
        end
      end
    end
  end

  # save geolocation data as module
  nhc.each do |reg,hlist|
    save_dir = File.join(save_path,reg.to_s); Dir.mkdir(save_dir) unless Dir.exists?(save_dir)
    region = reg==:al ? 'Atlantic' : 'Pacific'
    wiki_url = "https://en.wikipedia.org/wiki/#{strm_year}_#{region}_hurricane_season"
    wiki_tbl = Nokogiri::HTML(open(wiki_url)).css('table.wikitable.sortable tr')
    wiki_dead = [
      wiki_tbl.css('td[1]').map{|td| td.text.gsub(/\s/,' ').strip},
      wiki_tbl.css('td[8]').map{|td| td.children.last.text[/^\d+(,\d+)?/]}
    ].transpose.to_h
    File.open(File.join(save_dir,"hurricanes_#{reg}_#{strm_year}.rb"),'w') do |f|
      f.write("\# #{strm_year} #{region} Hurricane Season\n")
      f.write("module Hurricanes#{reg.upcase}#{strm_year}\n\n")
      f.write("\tdef self.hurricanes\n")
      f.write("\t\t@hurricanes\n")
      f.write("\tend\n\n")
      f.write("\t@hurricanes = [\n")
      hlist.each do |h|
        h[:hurricane][:deaths] = wiki_dead[h[:hurricane][:name]] || '0'
        f.write("\t\t{\n")
        f.write("\t\t\t\"#{h[:hurricane][:name]}\": {\n")
        f.write("\t\t\t\tstatus: true,\n")
        f.write("\t\t\t\tcategory: #{h[:hurricane][:category]},\n")
        f.write("\t\t\t\tdeaths: #{h[:hurricane][:deaths].gsub(',','')},\n")
        f.write("\t\t\t\tlatlng: [\n")
        h[:latlng].each do |geo|
          f.write("\t\t\t\t\t{lat: #{geo[:lat]}, ")
          f.write("lng: #{geo[:lng]}},\n")
        end
        f.write("\t\t\t\t]\n")
        f.write("\t\t\t}\n")
        f.write("\t\t},\n")
      end
      f.write("\t]\n")
      f.write("end")
    end
  end

  # # verify hurricane names, categories, and deaths
  # z = {}
  # z[:category] = nhc.map{|r,hlist| hlist.map{|h| [h[:hurricane][:name],h[:hurricane][:category]]}.to_h}
  # z[:deaths]   = nhc.map{|r,hlist| hlist.map{|h| [h[:hurricane][:name],h[:hurricane][:deaths]]}.to_h}

  # # split array based on value changes
  # arr = [1,1,2,2,2,3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,4,5,5,5,3,2,2,2,2]
  # idx = arr.each_index.to_a
  # brk = [ 0, *idx[1..-1].select{|i| arr[i]!=arr[i-1]}, idx[-1] ].uniq
  # seg = brk.each_cons(2).to_a.map{|a,b| arr.slice(a..b)}
end
