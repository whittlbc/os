module Languages
  require 'yaml'

  module AllLanguages
    def self.fetch
      YAML::load_file(File.join(Rails.root, 'config/languages.yml')).map { |key, val|
        {
            name: key,
            color: val['color'] ? val['color'] : '#FFFFFF'
        }
      }
    end
  end

end