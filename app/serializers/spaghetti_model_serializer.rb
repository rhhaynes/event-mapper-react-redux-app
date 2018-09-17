class SpaghettiModelSerializer < ActiveModel::Serializer
  attributes :name, :geolocations

  def geolocations
    object.geolocations.collect do |geolocation|
      { :lat => geolocation.lat, :lng => geolocation.lng }
    end
  end
end
