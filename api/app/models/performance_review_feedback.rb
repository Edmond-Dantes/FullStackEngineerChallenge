class PerformanceReviewFeedback < ApplicationRecord
  belongs_to :performance_review
  belongs_to :employee

  # convenience method to check pending status of a required performance review feedback
  def pending?
    # nil content field used for logically pending review status
    content.nil?
  end
end
