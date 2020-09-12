class PerformanceReviewFeedback < ApplicationRecord
  belongs_to :performance_review
  belongs_to :employee
end
