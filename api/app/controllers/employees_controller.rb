class EmployeesController < ApplicationController
  def index
    render json: {}
  end

  private

  def employee_params
    params.permit(:id)
  end

  def employee_id
    employee_params[:id]
  end
end
