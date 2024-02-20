class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.integer :status, default: 0
      t.datetime :due_date

      t.timestamps
    end
  end
end
