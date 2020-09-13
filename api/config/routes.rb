Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/', to: 'employees#index'
  post '/', to: 'employees#create'
  get '/:employee_id', to: 'employees#show'
end
