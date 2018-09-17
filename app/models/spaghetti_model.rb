class SpaghettiModel < ApplicationRecord
  belongs_to :hurricane
  has_many :geolocations, :as => :latlng
end
