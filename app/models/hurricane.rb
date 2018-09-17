class Hurricane < ApplicationRecord
  has_many :geolocations, :as => :latlng
  has_many :spaghetti_models
end
