source 'https://rubygems.org'

ruby '2.0.0'

gem 'rails', '3.2.11'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

# Use postgresql for database engine
gem 'mysql2', '~> 0.3.15'

gem 'pg', '~> 0.17.1'

group :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 1.3.9'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'

group :heroku do
  gem 'rails_log_stdout',           github: 'heroku/rails_log_stdout'
  gem 'rails3_serve_static_assets', github: 'heroku/rails3_serve_static_assets'
end

group :production do
  gem 'rails_12factor'
end

gem 'backbone-on-rails' # KD
gem 'requirejs-rails' , :git => 'https://github.com/coderanger/requirejs-rails.git' # See https://github.com/jwhitley/requirejs-rails/pull/59 # KD