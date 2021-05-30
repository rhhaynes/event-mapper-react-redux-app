# https://www.wunderground.com/hurricane/hurrarchive.asp
# - https://www.wunderground.com/hurricane/atYYYY.asp
# - https://www.wunderground.com/hurricane/epYYYY.asp
require 'nokogiri'
require 'open-uri'

# == Specify Input Parameters ================================================ #

strm_year = Time.now.year.to_s
file_path = Dir.pwd
save_path = File.join(file_path,'hurricanes')
Dir.mkdir(save_path) unless Dir.exists?(save_path)

url = 'https://www.wunderground.com'
asp = ["at#{strm_year}.asp", "ep#{strm_year}.asp"].map{|sfx| url+'/hurricane/'+sfx}
wu  = {:al => [], :ep => []}

# == Scrape Archived Hurricane Data ========================================== #

# sshws_kn = [34, 64, 83, 96, 113, 137]
sshws_mph = [39, 74, 96, 111, 130, 157]

# compile list of hurricanes
asp.each do |archive|
  reg = archive.include?("at#{strm_year}.asp") ? :al : :ep
  wu[reg] = Nokogiri::HTML(open(archive)).css('td a').collect do |link|
    {
      :url => url + link['href'],
      :hurricane  => {
        :hid      => link['href'][/(at|ep)\d+/],
        :year     => strm_year,
        :name     => link.text[/((?<=Cyclone )|(?<=Depression )|(?<=Hurricane )|(?<=Storm )).+/],
        :category => -1,
        :deaths   => nil
      },
      :latlng => []
    }
  end
end

# compile hurricane data
wu.each do |reg,hlist|
  wiki_reg  = reg==:al ? 'Atlantic' : 'Pacific'
  wiki_url  = "https://en.wikipedia.org/wiki/#{strm_year}_#{wiki_reg}_hurricane_season"
  wiki_tbl  = Nokogiri::HTML(open(wiki_url)).css('table.wikitable.sortable tr')
  wiki_dead = [
    wiki_tbl.css('td[1]').map{|td| td.text.gsub(/\s/,' ').strip},
    wiki_tbl.css('td[8]').map{|td| td.children.last.text[/^\d+(,\d+)?/]}
  ].transpose.to_h
  hlist.each do |h|
    Nokogiri::HTML(open(h[:url])).css('tr')[1..-1].each do |tr|
      h[:latlng] << {
        :date     => strm_year + tr.css('td[1] span').text.split(' ').map{|s|
                     ( s.length==3 ? Date::ABBR_MONTHNAMES.index(s).to_s : s ).rjust(2,'0')}.join(''),
        :time_utc => tr.css('td[2] span').text.gsub(/\D/,''),
        :lat      => tr.css('td[3] span').text.gsub(/°/,''),
        :lng      => tr.css('td[4] span').text.gsub(/°/,''),
        :wind_mph => tr.css('td[5]').text.gsub(/\D/,'')
      }
      cat = sshws_mph.each_index.select{|i| sshws_mph[i] < h[:latlng][-1][:wind_mph].to_f}.max || -1
      h[:hurricane][:category] = cat if cat > h[:hurricane][:category]
      h[:hurricane][:deaths]   = wiki_dead[h[:hurricane][:name]] || '0'
    end
  end
end

# == Seed Hurricanes ========================================================= #

wu.each do |reg,hlist|
  save_dir = File.join(save_path,reg.to_s); Dir.mkdir(save_dir) unless Dir.exists?(save_dir)
  File.open(File.join(save_dir,"hurricanes_#{reg}_#{strm_year}.rb"),'w') do |f|
    f.write("\# #{strm_year} #{reg==:al ? 'Atlantic' : 'Pacific'} Hurricane Season\n")
    f.write("module Hurricanes#{reg.upcase}#{strm_year}\n\n")
    f.write("\tdef self.hurricanes\n")
    f.write("\t\t@hurricanes\n")
    f.write("\tend\n\n")
    f.write("\t@hurricanes = [\n")
    hlist.each do |h|
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
