require 'rails_helper'

RSpec.describe "PerformanceReviewFeedbacks", type: :request do
  describe "POST /employees/:employee_id/performance_reviews/:performance_reviews_id/performance_review_feedbacks" do
    it "returns new performance review feedback data" do
      employee1 = Employee.create
      employee2 = Employee.create
      performance_review = PerformanceReview.create(employee_id: employee1.id)
      expected = {
          id: 1,
          content: nil,
          employee_id: 2
        }.to_json

      post "/employees/1/performance_reviews/1/performance_review_feedbacks", params: { reviewer_id: 2 }
      expect(response.body).to be == expected
    end
  end

  describe "PATCH /employees/:employee_id/performance_reviews/:performance_reviews_id/performance_review_feedbacks/:performance_review_feedback_id" do
    it "returns updated performance review feedback data" do
      employee1 = Employee.create
      employee2 = Employee.create
      performance_review = PerformanceReview.create(employee_id: employee1.id)
      performance_review_feedback =
        PerformanceReviewFeedback
          .create(
            employee_id: employee2.id,
            performance_review_id: performance_review.id
          )
      expected = {
          id: 1,
          content: "test_content",
          employee_id: 2
        }.to_json

      patch "/employees/1/performance_reviews/1/performance_review_feedbacks/1", params: { content: "test_content" }
      expect(response.body).to be == expected
    end
  end

end
