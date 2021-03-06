Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope :employees do
    # employee resource routes
    get '/', to: 'employees#index'
    post '/', to: 'employees#create'
    get '/:employee_id', to: 'employees#show'
    delete '/:employee_id', to: 'employees#delete'

    # performance review resource routes
    post '/:employee_id/performance_reviews', to: 'performance_reviews#create'
    get '/:employee_id/performance_reviews/:performance_review_id', to: 'performance_reviews#show'

    # performance review feedback resource routes
    post '/:employee_id/performance_reviews/:performance_review_id/performance_review_feedbacks', to: 'performance_review_feedbacks#create'
    get '/:employee_id/performance_reviews/:performance_review_id/performance_review_feedbacks/:performance_review_feedback_id', to: 'performance_review_feedbacks#show'
    patch '/:employee_id/performance_reviews/:performance_review_id/performance_review_feedbacks/:performance_review_feedback_id', to: 'performance_review_feedbacks#update'
  end
end
