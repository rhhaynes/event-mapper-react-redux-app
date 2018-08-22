class Volcano < ApplicationRecord
  has_one :geolocation, :as => :latlng
end
