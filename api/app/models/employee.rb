class Employee < ApplicationRecord
  has_many :performance_reviews, dependent: :destroy
end
