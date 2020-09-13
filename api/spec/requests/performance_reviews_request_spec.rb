require 'rails_helper'

RSpec.describe "PerformanceReviews", type: :request do
  describe "POST /employees/:employee_id/performance_reviews" do
    it "returns new performance review data" do
      employee = Employee.create
      expected = {
          id: 1,
          performance_review_feedbacks: []    
        }.to_json

      post "/employees/1/performance_reviews"
      expect(response.body).to be == expected
    end
  end

  describe "GET /employees/:employee_id/performance_reviews/:performance_review_id" do
    it "returns new performance review data" do
      employee = Employee.create
      PerformanceReview.create(employee_id: employee.id)
      expected = {
          id: 1,
          performance_review_feedbacks: []    
        }.to_json

      get "/employees/1/performance_reviews/1"
      expect(response.body).to be == expected
    end
  end

end
