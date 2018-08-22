class Geolocation < ApplicationRecord
  belongs_to :latlng, :polymorphic => true
end
