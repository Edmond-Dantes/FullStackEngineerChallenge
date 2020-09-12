class EmployeesController < ApplicationController
  def index
    render json: Employee.all
  end

  def show
    if employee = Employee.find_by(id: employee_id)
      render json: employee
    else
      render json: nil, status: :not_found
    end
  end

  private

  def employee_params
    params.permit(:id)
  end

  def employee_id
    employee_params[:id]
  end
end
