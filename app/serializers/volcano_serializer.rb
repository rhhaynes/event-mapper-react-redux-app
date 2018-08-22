class VolcanoSerializer < ActiveModel::Serializer
  attributes :name, :location, :category, :elev_m
  has_one :geolocation, :as => :latlng
end
