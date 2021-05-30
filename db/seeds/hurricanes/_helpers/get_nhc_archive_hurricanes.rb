# https://www.nhc.noaa.gov/data/#hurdat
# - https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2017-050118.txt
# - https://www.nhc.noaa.gov/data/hurdat/hurdat2-nepac-1949-2017-050418.txt
require 'nokogiri'
require 'open-uri'

# == Specify Input Parameters ================================================ #

file_path = Dir.pwd
save_path = File.join(file_path,'hurricanes')
Dir.mkdir(save_path) unless Dir.exists?(save_path)

txt = ['hurdat2-al-1980-2017-050118.txt', 'hurdat2-ep-1980-2017-050418.txt'].map{|f| File.join(file_path,f)}
nhc = {:al => [], :ep => []}

# == Compile Hurricane Data ================================================== #

# sshws_kn = [34, 64, 83, 96, 113, 137]
sshws_mph = [39, 74, 96, 111, 130, 157]

txt.each do |file|
  idx = -1
  reg = file[/(?<=hurdat2-)(al|ep)/].to_sym
  File.foreach(file) do |line|
    arr = line.gsub(/\s+/,'').split(',')
    if arr.size == 3
      idx+=1
      nhc[reg][idx] = {
        :hurricane => nil,
        :latlng    => []
      }
      nhc[reg][idx][:hurricane] = {
        :hid      => arr[0],
        :year     => arr[0][-4..-1],
        :name     => arr[1]=='UNNAMED' ? arr[0] : arr[1].capitalize,
        :category => -1,
        :deaths   => nil
      }
    else
      nhc[reg][idx][:latlng] << {
        :date     => arr[0],
        :time_utc => arr[1],
        :lat      => arr[4][-1]=='N' ? arr[4][0..-2] : '-'+arr[4][0..-2],
        :lng      => arr[5][-1]=='E' ? arr[5][0..-2] : '-'+arr[5][0..-2],
        :wind_mph => ( arr[6].to_f * 1.150779 ).round.to_s
      }
      cat = sshws_mph.each_index.select{|i| sshws_mph[i] < nhc[reg][idx][:latlng][-1][:wind_mph].to_f}.max || -1
      nhc[reg][idx][:hurricane][:category] = cat if cat > nhc[reg][idx][:hurricane][:category]
    end
  end
end

# == Seed Hurricanes ========================================================= #

nhc.each do |reg,hlist|
  save_dir = File.join(save_path,reg.to_s); Dir.mkdir(save_dir) unless Dir.exists?(save_dir)
  region = reg==:al ? 'Atlantic' : 'Pacific'
  [*'1980'..'2017'].each do |strm_year|
    strm_list = hlist.select{|h| h[:hurricane][:year]==strm_year}
    wiki_url  = "https://en.wikipedia.org/wiki/#{strm_year}_#{region}_hurricane_season"
    wiki_tbl  = Nokogiri::HTML(open(wiki_url)).css('table.wikitable.sortable tr')
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
      strm_list.each do |h|
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
end
