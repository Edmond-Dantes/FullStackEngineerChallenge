class PerformanceReviewsController < ApplicationController

  # Admin can use this action to: 
  # Assign employees to participate in another employee's performance review
  def create
    if employee = Employee.find_by(id: employee_id)
      performance_review = PerformanceReview.create(employee_id: employee.id)
      render json: performance_review, include: '**'
    else
      render json: nil, status: :bad_request
    end
  end

  def update
    # TODO:
    # move responsibility to a performance_review_feedbacks controller
    #   considering a performance review feedback's content is the only update-able field
  end

  def show
    if employee = Employee.find_by(id: employee_id)
      if performance_review =
        employee
          .performance_reviews
          .find_by(id: performance_review_id)

        render json: performance_review, include: '**'
      else
        render json: nil, status: :not_found
      end
    else
      render json: nil, status: :not_found
    end
  end

  private

  def employee_id
    params[:employee_id]
  end

  def performance_review_params
    params.permit(:content)
  end

  def performance_review_id
    params[:performance_review_id]
  end
end
