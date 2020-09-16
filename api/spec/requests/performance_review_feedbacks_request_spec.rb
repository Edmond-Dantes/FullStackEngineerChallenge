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
          employee_id: 2,
          performance_review_id: 1,
          reviewee_id: 1,
          pending_feedback: true
        }.to_json

      post "/employees/1/performance_reviews/1/performance_review_feedbacks", params: { reviewer_id: 2 }
      expect(response.body).to be == expected
    end

    it "returns bad request status for non-existent reviewer" do
      employee1 = Employee.create
      employee2 = Employee.create
      performance_review = PerformanceReview.create(employee_id: employee1.id)

      post "/employees/1/performance_reviews/1/performance_review_feedbacks", params: { reviewer_id: 999 }
      expect(response.status).to be == 400
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
          employee_id: 2,
          performance_review_id: 1,
          reviewee_id: 1,
          pending_feedback: false
        }.to_json

      patch "/employees/1/performance_reviews/1/performance_review_feedbacks/1", params: { content: "test_content" }
      expect(response.body).to be == expected
    end

    it "returns not found status for non-existent performance review feedback record" do
      employee1 = Employee.create
      employee2 = Employee.create
      performance_review = PerformanceReview.create(employee_id: employee1.id)
      performance_review_feedback =
        PerformanceReviewFeedback
          .create(
            employee_id: employee2.id,
            performance_review_id: performance_review.id
          )

      patch "/employees/1/performance_reviews/1/performance_review_feedbacks/999", params: { content: "test_content" }
      expect(response.status).to be == 404
    end
  end

end
