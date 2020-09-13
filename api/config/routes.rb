Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # employee resource routes
  get '/', to: 'employees#index'
  post '/', to: 'employees#create'
  get '/:employee_id', to: 'employees#show'
  delete '/:employee_id', to: 'employees#delete'

  # performance review resource routes
  post '/:employee_id/', to: 'performance_reviews#create'
  patch '/:employee_id/', to: 'performance_reviews#update'
  get '/:employee_id/performance_reviews/:performance_review_id', to: 'performance_reviews#show'

end
