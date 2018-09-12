class Geolocation < ApplicationRecord
  belongs_to :latlng, :polymorphic => true, :optional => true
end
