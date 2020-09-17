class PerformanceReviewFeedbackSerializer < ActiveModel::Serializer
  attributes :id, :content, :employee_id, :performance_review_id, :reviewee_id, :pending_feedback

  def reviewee_id
    object.performance_review.employee_id
  end

  def pending_feedback
    object.pending?
  end
end
