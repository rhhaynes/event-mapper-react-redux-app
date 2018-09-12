# == Seed Hurricanes ========================================================= #

if Hurricane.all.empty?
  puts "== seeds.rb Hurricane: seeding ".ljust(79, "=")
  puts "-- create hurricanes (1995-2017)"
  t_start = Time.now

	[*1995..2018].each do |year|
		print "\r   -> %d" % year
		require_relative "./seeds/hurricanes/hurricanes#{year}.rb"

		Object.const_get("Hurricanes#{year}").hurricanes.each do |hurricane|
			name = hurricane.keys.first

			Hurricane.create(
				:year     => year.to_s,
				:name     => name.to_s,
				:status   => hurricane[name][:status],
				:category => hurricane[name][:category],
				:deaths   => hurricane[name][:deaths]
			).geolocations.create(
				hurricane[name][:latlng]
			)
		end
	end

	puts "\r   -> %.4fs" % (Time.now - t_start)
  puts "== seeds.rb Hurricane: seeded #{"(%.4fs)" % (Time.now - t_start)} ".ljust(79, "=")
  puts
end

# == Seed Volcanoes ========================================================== #

if Volcano.all.empty?
  puts "== seeds.rb Volcano: seeding ".ljust(79, "=")
  puts "-- create volcanoes (A-Z)"
  t_start = Time.now

	[*'A'..'Z'].each do |letter|
		print "\r   -> %s" % letter
		require_relative "./seeds/volcanoes/volcanoes#{letter}.rb"

		Object.const_get("Volcanoes#{letter}").volcanoes.each do |volcano|
			name = volcano.keys.first

			Volcano.create(
				:letter   => letter,
				:name     => name.to_s,
				:location => volcano[name][:location],
				:category => volcano[name][:type],
				:elev_m   => volcano[name][:elev_m]
			).create_geolocation(
				volcano[name][:latlng]
			)
		end
	end

	puts "\r   -> %.4fs" % (Time.now - t_start)
  puts "== seeds.rb Volcano: seeded #{"(%.4fs)" % (Time.now - t_start)} ".ljust(79, "=")
  puts
end
