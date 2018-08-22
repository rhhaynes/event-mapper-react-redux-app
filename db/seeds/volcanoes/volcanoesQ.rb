module VolcanoesQ

	def self.volcanoes
		@volcanoes
	end

	@volcanoes = [
		{
			"Qal'eh Hasan Ali": {
				location: "Iran",
				type: "Maars",
				latlng: {lat: 29.40, lng: 57.57},
				elev_m: nil
			}
		},
		{
			"Qualibou": {
				location: "W Indies",
				type: "Caldera",
				latlng: {lat: 13.83, lng: -61.05},
				elev_m: 777
			}
		},
		{
			"Quetrupillan": {
				location: "Chile-C",
				type: "Stratovolcano",
				latlng: {lat: -39.50, lng: -71.70},
				elev_m: 2360
			}
		},
		{
			"Quezaltepeque": {
				location: "Guatemala",
				type: "Volcanic field",
				latlng: {lat: 14.57, lng: -89.45},
				elev_m: 1200
			}
		},
		{
			"Quill, The": {
				location: "W Indies",
				type: "Stratovolcano",
				latlng: {lat: 17.48, lng: -62.96},
				elev_m: 601
			}
		},
		{
			"Quilotoa": {
				location: "Ecuador",
				type: "Caldera",
				latlng: {lat: -0.85, lng: -78.90},
				elev_m: 3914
			}
		},
		{
			"Quimsachata": {
				location: "Perú",
				type: "Lava dome",
				latlng: {lat: -14.20, lng: -71.33},
				elev_m: 3923
			}
		}
	]
end
