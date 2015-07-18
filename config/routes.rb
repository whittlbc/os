Backboneworld::Application.routes.draw do

  get '/' => 'home#index'
  get '/projects/feed', to: 'projects#feed'
  post '/projects/createByGH', to: 'projects#createByGH'

  resources :projects

  resources :users do
    collection do
      get :login, :path => '/login'
      get :username_test, :path => '/checkUsername'
      post :gh_code, :path => '/postGHCode'
      get :get_by_gh_username, :path => '/getByGHUsername'
      get :get_all_user_repos, :path => '/getAllUserRepos'
    end
  end

  root :to => "home#index"

end
