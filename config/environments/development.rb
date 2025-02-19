Backboneworld::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  config.eager_load = false

  # Log error messages when you accidentally call methods on nil.
  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
      :port                 =>  587,
      :address              =>  'smtp.mandrillapp.com',
      :user_name            =>  ENV['MANDRILL_USERNAME'],
      :password             =>  ENV['MANDRILL_PASSWORD'],
      :enable_starttls_auto =>  true,
      :authentication       => 'login'
  }

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Compress JavaScripts and CSS
  # config.assets.compress = true

  # Don't fallback to assets pipeline if a precompiled asset is missed
  # config.assets.compile = true

  # Expands the lines which load the assets
  config.assets.debug = true

  config.assets.precompile += %w( bootstrap.min.css )

end
