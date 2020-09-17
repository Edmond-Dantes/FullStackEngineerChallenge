class CreatePerformanceReviewFeedbacks < ActiveRecord::Migration[6.0]
  def change
    create_table :performance_review_feedbacks do |t|
      t.references :performance_review, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
