class VolcanosController < ApplicationController
  def show
    if params_letter_exists?
      render :json => ActiveModel::Serializer::CollectionSerializer.new(
        @volcanoes, :each_serializer => VolcanoSerializer).to_json
    end
  end

  private

  def params_letter_exists?
    !!( @volcanoes = Volcano.where(:letter => params[:ltr]) )
  end
end
