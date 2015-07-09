Backboneworld::Application.routes.draw do

  get '/' => 'home#index'
  get '/projects/feed', to: 'projects#feed'

  resources :projects

  resources :users do
    collection do
      get :login, :path => '/login'
      get :username_test, :path => '/check_username'
      post :gh_code, :path => '/postGHCode'
    end
  end

  root :to => "home#index"

end
