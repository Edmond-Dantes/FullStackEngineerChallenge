class PerformanceReview < ApplicationRecord
  belongs_to :employee
  has_many :performance_review_feedbacks
end
