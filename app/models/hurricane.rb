class Hurricane < ApplicationRecord
  has_many :geolocations, :as => :latlng
end
