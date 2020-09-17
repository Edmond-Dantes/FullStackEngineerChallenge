class Employee < ApplicationRecord
  has_many :performance_reviews, dependent: :destroy
  has_many :performance_review_feedbacks
end
