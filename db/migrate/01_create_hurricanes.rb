class CreateHurricanes < ActiveRecord::Migration[5.1]
  def change
    create_table :hurricanes do |t|
      t.string  :year
      t.string  :region
      t.string  :name
      t.boolean :status
      t.integer :category
      t.integer :deaths
    end
  end
end
