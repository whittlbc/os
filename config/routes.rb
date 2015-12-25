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
      put :launch, :path => '/launch'
      get :get_up_for_grabs, :path => '/getUpForGrabs'
      post :fetch_gh_contributors, :path => '/fetchGHContributors'
      get :fetch_gh_repo_stats, :path => '/fetchGHRepoStats'
      post :post_new_comment, :path => '/postNewComment'
      get :fetch_comments, :path => '/fetchComments'
      put :comment_vote, :path => '/commentVote'
      get :get_up_for_grabs_details, :path => '/getUpForGrabsDetails'
      put :pull_project, :path => '/pullProject'
      get :get_evolution, :path => '/getEvolution'
      put :destroy_comment, :path => '/destroyComment'
      put :destroy_project, :path => '/destroyProject'
      put :edit, :path => '/edit'
      get :search, :path => '/search'
      post :request_to_join, :path => '/requestToJoin'
      post :send_invite_emails, :path => '/sendInviteEmails'
      put :respond_to_request, :path => '/respondToRequest'
      put :saw_notifications, :path => '/sawNotifications'
    end
  end

  resources :evolutions do
    collection do
      post :create_new_evolution, :path => '/createNewEvolution'
      put :delete_evolution_item, :path => '/deleteEvolutionItem'
    end
  end

  resources :users do
    collection do
      get :get_non_cached_user_info, :path => '/getNonCachedInfo'
      get :login, :path => '/login'
      get :username_test, :path => '/checkUsername'
      get :get_by_gh_username, :path => '/getByGHUsername'
      get :get_all_user_repos, :path => '/getAllUserRepos'
      get :get_repo_details, :path => '/getRepoDetails'
      put :star, :path => '/star'
      get :get_my_projects, :path => '/getMyProjects'
      get :get_starred_projects, :path => '/getStarredProjects'
    end
  end

  resources :suggestions do
    collection do
    end
  end

  # Catch 404's and redirect home
  get '*unmatched_route', to: 'application#not_found'

end
