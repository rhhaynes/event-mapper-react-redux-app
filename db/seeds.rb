# == Seed Hurricanes ========================================================= #

if Hurricane.all.empty?
  puts "== seeds.rb Hurricane: seeding ".ljust(79, "=")
  puts "-- create hurricanes (1980-2018)"
  t_start = Time.now

	[*1980..2018].each do |year|
    ['al','ep'].each do |region|
      print "\r   -> %d (%s)" % [year, region]
      require_relative "./seeds/hurricanes/#{region}/hurricanes_#{region}_#{year}.rb"

  		Object.const_get("Hurricanes#{region.upcase}#{year}").hurricanes.each do |hurricane|
  			name = hurricane.keys.first

  			Hurricane.create(
  				:year     => year.to_s,
  				:name     => name.to_s,
          :region   => region,
  				:status   => hurricane[name][:status],
  				:category => hurricane[name][:category],
  				:deaths   => hurricane[name][:deaths]
  			).geolocations.create(
  				hurricane[name][:latlng]
  			)
  		end
  	end
  end

	puts "\r   -> %.4fs" % (Time.now - t_start)
  puts "== seeds.rb Hurricane: seeded #{"(%.4fs)" % (Time.now - t_start)} ".ljust(79, "=")
  puts
end

# == Seed Hurricane Spaghetti Models ========================================= #

if SpaghettiModel.all.empty?
  puts "== seeds.rb SpaghettiModel: seeding ".ljust(79, "=")
  puts "-- create spaghetti models (2008-2018)"
  t_start = Time.now

	[*2008..2018].each do |year|
		print "\r   -> %d" % year
		require_relative "./seeds/spaghetti_models/spaghetti_models_#{year}.rb"

    Object.const_get("SpaghettiModels#{year}").spaghetti_models.each do |h|
      hurricane = Hurricane.find_by(:year => year, :name => h.keys.first)
      if !!hurricane
        h.values.first.each do |sm|
          hurricane.spaghetti_models.create(:name => sm[:name]).geolocations.create(sm[:latlng])
        end
      end
		end
	end

	puts "\r   -> %.4fs" % (Time.now - t_start)
  puts "== seeds.rb SpaghettiModel: seeded #{"(%.4fs)" % (Time.now - t_start)} ".ljust(79, "=")
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
