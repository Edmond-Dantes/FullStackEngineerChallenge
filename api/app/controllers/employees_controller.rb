class EmployeesController < ApplicationController
  
  def index
    # uses nested active model serialization ie. "render json: Employee.all, include: '**'"
    # '**' includes all recursively
    # ref: https://github.com/rails-api/active_model_serializers/blob/v0.10.6/docs/general/adapters.md#include-option
    
    render json: Employee.all, include: '**'
  end

  def create
    new_employee = Employee.create
    render json: new_employee, include: '**'
  end

  def show
    if employee = Employee.find_by(id: employee_id)
      render json: employee, include: '**'
    else
      render json: nil, status: :not_found
    end
  end

  def delete
    if employee = Employee.find_by(id: employee_id)
      employee.destroy
      render json: {}
    else
      render json: nil, status: :not_found
    end
  end

  private

  def employee_params
    params.permit(:employee_id)
  end

  def employee_id
    employee_params[:employee_id]
  end
end
