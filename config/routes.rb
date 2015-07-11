Backboneworld::Application.routes.draw do

  get '/' => 'home#index'
  get '/projects/feed', to: 'projects#feed'

  resources :projects

  resources :users do
    collection do
      get :login, :path => '/login'
      get :username_test, :path => '/checkUsername'
      post :gh_code, :path => '/postGHCode'
      get :get_by_gh_username, :path => '/getByGHUsername'
    end
  end

  root :to => "home#index"

end
