class GeolocationSerializer < ActiveModel::Serializer
  attributes :lat, :lng
  belongs_to :latlng, :polymorphic => true
end
