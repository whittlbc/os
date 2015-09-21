Backboneworld::Application.routes.draw do

  get '/' => 'home#index'
  get '/login/ghLoginCB' => 'login#gh_login_cb'
  root :to => "home#index"
  get '/languages/getAll' => 'languages#get_all'

  resources :projects do
    collection do
      get :fetch_details, :path => '/fetchDetails'
      get :feed, :path => '/feed'
      post :create_by_gh, :path => '/createByGH'
      get :pull_from_ideas, :path => '/pullFromIdeas'
      post :filtered_feed, :path => '/filteredFeed'
      put :vote, :path => '/vote'
      get :universal_search, :path => '/universalSearch'
      post :join, :path => '/join'
      post :launch, :path => '/launch'
      get :get_up_for_grabs, :path => '/getUpForGrabs'
      post :fetch_gh_contributors, :path => '/fetchGHContributors'
      get :fetch_gh_repo_stats, :path => '/fetchGHRepoStats'
      post :post_new_comment, :path => '/postNewComment'
      get :fetch_comments, :path => '/fetchComments'
      put :comment_vote, :path => '/commentVote'
      get :get_up_for_grabs_details, :path => '/getUpForGrabsDetails'
      put :pull_project, :path => '/pullProject'
      get :get_evolution, :path => '/getEvolution'
    end
  end

  resources :users do
    collection do
      get :login, :path => '/login'
      get :username_test, :path => '/checkUsername'
      get :get_by_gh_username, :path => '/getByGHUsername'
      get :get_all_user_repos, :path => '/getAllUserRepos'
      get :get_repo_details, :path => '/getRepoDetails'
      put :star, :path => '/star'
    end
  end

end
