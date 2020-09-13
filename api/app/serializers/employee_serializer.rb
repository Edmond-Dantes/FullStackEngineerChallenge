class EmployeeSerializer < ActiveModel::Serializer
  attributes :id
  has_many :performance_reviews
end
