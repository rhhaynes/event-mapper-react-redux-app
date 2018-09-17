class CreateVolcanos < ActiveRecord::Migration[5.1]
  def change
    create_table :volcanos do |t|
      t.string  :letter
      t.string  :name
      t.string  :location
      t.string  :category
      t.integer :elev_m
    end
  end
end
