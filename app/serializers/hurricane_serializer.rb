class HurricaneSerializer < ActiveModel::Serializer
  attributes :name, :status, :category, :deaths
  has_many :geolocations, :as => :latlng
end
