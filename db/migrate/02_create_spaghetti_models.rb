class CreateSpaghettiModels < ActiveRecord::Migration[5.1]
  def change
    create_table :spaghetti_models do |t|
      t.belongs_to :hurricane, index: true
      t.string  :name
    end
  end
end
