class LocationSerializer < ActiveModel::Serializer
  attributes :name, :description
  has_one :geolocation, :as => :latlng
end
