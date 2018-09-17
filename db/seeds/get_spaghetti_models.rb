require 'json'
require 'nokogiri'
require 'open-uri'
require 'zip'

# == Specify Input Parameters ================================================ #

strm_year = "2018"

file_path = Dir.pwd
temp_path = file_path + "/tmp/"; Dir.mkdir(temp_path) unless Dir.exists?(temp_path)
shp_path  = temp_path +  "shp/"; Dir.mkdir( shp_path) unless Dir.exists?( shp_path)
geo_path  = temp_path +  "geo/"; Dir.mkdir( geo_path) unless Dir.exists?( geo_path)

save_path = file_path + "/spaghetti_models/"
data_file = save_path + "spaghetti_models_#{strm_year}.rb"
Dir.mkdir(save_path) unless Dir.exists?(save_path)

# == Scrape Archived Hurricane Data ========================================== #

if !File.file?(data_file)
    # if hurricane data for the specified year cannot be found locally,
    # download and process zip files from the National Hurricane Center
    base_url = "https://www.nhc.noaa.gov"

    # compile list of hurricanes
    archive_url = base_url + "/gis/archive_forecast.php?year=#{strm_year}"
    archive_atl = Nokogiri::HTML(open(archive_url)).css('a')
      .select{|link| link['href'] =~ /\S+al\d+&year=#{strm_year}&name=Hurricane.+/}
      .collect{|link| {
        :name => link.children.text.split(' ').map{|str| str.capitalize}.join(' '),
        :url => base_url + link.attributes['href'].value.gsub(' ','%20'),
        :zipfiles => nil,
        :geolocations => {}
      }}

    # compile list of zip files for each hurricane
    archive_atl.each do |h|
      h[:zipfiles] = Nokogiri::HTML(open(h[:url])).css('a')
        .select{|link| link['href'] =~ /\S+al\S+5day\S+\d+.zip/}
        .collect{|link| base_url + "/gis/" + link.attributes['href'].value}
    end

    # open zip files in memory, extract select shapefiles, convert to geojson
    archive_atl.each do |h|
      h[:zipfiles].each do |url|
        Zip::File.open_buffer(open(url)) do |zipfile|
          zipfile.glob('*_pts.*').each{|file| zipfile.extract(file, shp_path + file.name)}
          if !zipfile.glob('*_pts.shp').empty?
            zipname = zipfile.glob('*_pts.shp').first.name.split('.')[0..-2].join('.')
            shpfile = shp_path + zipname + ".shp"
            geofile = geo_path + zipname + ".geojson"
            %x[ ogr2ogr -f GeoJSON -t_srs EPSG:4326 #{geofile} #{shpfile} ]
            # compile geolocation data for hurricane spaghetti models
            h[:geolocations][zipname] = JSON.parse(File.read(geofile))['features'].collect do |pt|
              { :lat => pt['geometry']['coordinates'][1], :lng => pt['geometry']['coordinates'][0] }
            end
          end
        end
      end
    end

    # save geolocation data as module
    File.open(data_file, 'w') do |f|
      f.write("\# #{strm_year} Atlantic Hurricane Spaghetti Models\n")
      f.write("module SpaghettiModels#{strm_year}\n\n")

      f.write("\tdef self.spaghetti_models\n")
      f.write("\t\t@spaghetti_models\n")
      f.write("\tend\n\n")

      f.write("\t@spaghetti_models = [\n")
      archive_atl.each do |h|
        f.write("\t\t{\n")
        f.write("\t\t\t\"#{h[:name].gsub('Hurricane ','')}\": [\n")
        h[:geolocations].each do |name, geolocations|
          f.write("\t\t\t\t{\n")
          f.write("\t\t\t\t\tname: \"#{name}\",\n")
          f.write("\t\t\t\t\tlatlng: [\n")
          geolocations.each do |latlng|
            f.write("\t\t\t\t\t\t{lat: #{latlng[:lat]}, ")
            f.write("lng: #{latlng[:lng]}},\n")
          end
          f.write("\t\t\t\t\t]\n")
          f.write("\t\t\t\t},\n")
        end
        f.write("\t\t\t]\n")
        f.write("\t\t},\n")
      end
      f.write("\t]\n")
      f.write("end")
    end
end
