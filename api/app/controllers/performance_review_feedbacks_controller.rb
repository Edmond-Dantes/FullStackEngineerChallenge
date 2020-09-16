class PerformanceReviewFeedbacksController < ApplicationController
  def create
    if performance_review =
      PerformanceReview
        .find_by(id: performance_review_id, employee_id: employee_id)

      performance_review_feedback =
        PerformanceReviewFeedback
          .create(
            performance_review_id: performance_review.id,
            employee_id: reviewer_id
          )

      render json: performance_review_feedback, include: '**'
    else
      render json: nil, status: :bad_request
    end
  end

  def update
    if performance_review =
      PerformanceReview
        .find_by(id: performance_review_id, employee_id: employee_id)
      
      if performance_review_feedback =
        performance_review
          .performance_review_feedbacks
          .find_by(id: performance_review_feedback_id)

        performance_review_feedback.update(performance_review_params)

        render json: performance_review_feedback, include: '**'
      else
        render json: nil, status: :not_found
      end
    else
      render json: nil, status: :bad_request
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

  def reviewer_id
    # alias for employee_id of employee assigned to participate in another employee's performance review
    params[:reviewer_id]
  end

  def performance_review_feedback_id
    params[:performance_review_feedback_id]
  end
end
