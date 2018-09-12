class Location < ApplicationRecord
  has_one :geolocation, :as => :latlng
  accepts_nested_attributes_for :geolocation
end
