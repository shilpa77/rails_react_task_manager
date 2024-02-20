Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks/create'
      get '/tasks/:id/edit', to: 'tasks#edit'
      patch '/tasks/:id/update', to: 'tasks#update'
      get '/show/:id', to: 'tasks#show'
      delete '/destroy/:id', to: 'tasks#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
