class CreateGeolocations < ActiveRecord::Migration[5.1]
  def change
    create_table :geolocations do |t|
      t.references :latlng, polymorphic: true, index: true
      t.float :lat
      t.float :lng
    end
  end
end
