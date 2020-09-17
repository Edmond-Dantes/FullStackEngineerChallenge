class EmployeeSerializer < ActiveModel::Serializer
  attributes :id
  has_many :performance_reviews
  has_many :performance_review_feedbacks
end
