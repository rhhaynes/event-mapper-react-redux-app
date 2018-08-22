class HurricanesController < ApplicationController
  def show
    if params_year_exists?
      render :json => ActiveModel::Serializer::CollectionSerializer.new(
        @hurricanes, :each_serializer => HurricaneSerializer).to_json
    end
  end

  private

  def params_year_exists?
    !!( @hurricanes = Hurricane.where(:year => params[:yr]) )
  end
end
