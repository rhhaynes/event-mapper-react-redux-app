class HurricaneSerializer < ActiveModel::Serializer
  attributes :name, :region, :status, :category, :deaths
  has_many :geolocations, :as => :latlng
  has_many :spaghetti_models
end
