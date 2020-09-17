class CreatePerformanceReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :performance_reviews do |t|
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
