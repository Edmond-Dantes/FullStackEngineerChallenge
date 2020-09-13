class PerformanceReviewSerializer < ActiveModel::Serializer
  attributes :id
  has_many :performance_review_feedbacks
end
