class LocationsController < ApplicationController
  def index
    @locations = Location.all
    render :json => ActiveModel::Serializer::CollectionSerializer.new(
      @locations, :each_serializer => LocationSerializer).to_json
  end

  def create
    @location = Location.new(location_params)
    render :json => @location if @location.save
  end

  private

  def location_params
    params.require(:location).permit(:name, :description, :geolocation_attributes => [:lat, :lng])
  end
end
