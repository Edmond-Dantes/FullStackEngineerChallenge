require 'rails_helper'

RSpec.describe "Employees", type: :request do
  describe "GET /employees" do
    it "returns list of employee data" do
      Employee.create
      expected = [
        {
          id: 1,
          performance_reviews: []    
        }
      ].to_json

      get "/employees"
      expect(response.body).to be == expected
    end
  end

  describe "POST /employees" do
    it "returns new employee data" do
      expected = {
          id: 1,
          performance_reviews: []    
        }.to_json

      post "/employees"
      expect(response.body).to be == expected
    end
  end

  describe "GET /employees/:employee_id" do
    it "returns employee data" do
      Employee.create
      expected = {
          id: 1,
          performance_reviews: []    
        }.to_json

      get "/employees/1"
      expect(response.body).to be == expected
    end
  end

  describe "DELETE /employees/:employee_id" do
    it "returns http success" do
      Employee.create
      expected = {}.to_json

      delete "/employees/1"
      expect(response.body).to be == expected
      expect(response).to have_http_status(:success)
    end
  end

end
