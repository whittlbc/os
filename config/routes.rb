Backboneworld::Application.routes.draw do

  get '/' => 'home#index'
  root :to => "home#index"
  get '/languages/getAll' => 'languages#get_all'

  resources :projects do
    collection do
      get :feed, :path => '/feed'
      post :create_by_gh, :path => '/createByGH'
      get :pull_from_ideas, :path => '/pullFromIdeas'
      post :filtered_feed, :path => '/filteredFeed'
      put :vote, :path => '/vote'
    end
  end

  resources :users do
    collection do
      get :login, :path => '/login'
      get :username_test, :path => '/checkUsername'
      post :gh_code, :path => '/postGHCode'
      get :get_by_gh_username, :path => '/getByGHUsername'
      get :get_all_user_repos, :path => '/getAllUserRepos'
    end
  end

end
