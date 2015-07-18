class ApplicationController < ActionController::Base
  protect_from_forgery
  require 'yaml'

  languages_yml = YAML::load_file(File.join(Rails.root, 'config/languages.yml'))
  all_languages = languages_yml.map { |key, val|
    {
        name: key,
        color: val['color'] ? val['color'] : '#FFFFFF'
    }
  }

end
