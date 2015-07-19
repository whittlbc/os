require 'yaml'

YAML::load_file(File.join(Rails.root, 'config/languages.yml')).each { |key, val|

  obj = {:name => key, :color => val['color'] ? val['color'] : '#FFFFFF'}

  if key == 'Shell'
    obj[:frameworks] = ['Bash']
  elsif key == 'JavaScript'
    obj[:frameworks] = ['Express', 'Backbone', 'Angular', 'Node', 'React', 'Angular', 'Ember', 'Famo.us', 'Protoype', 'ExtJS', 'Mootools', 'Spry', 'script.aculo.us', 'ASP.NET', 'Dojo', 'MochiKit']
  elsif key == 'CSS'
    obj[:frameworks] = ['Blueprint', 'YAML', 'Sass']
  elsif key == 'Java'
    obj[:frameworks] = ['Spring', 'GWT', 'Cocoon', 'Aranea', 'JSF', 'AppFuse', 'Struts']
  elsif key == 'PHP'
    obj[:frameworks] = ['Zend', 'CakePHP', 'Symfony', 'CodeIgniter', 'Akelos', 'Agavi', 'Prado', 'Barebones', 'Laravel']
  elsif key == 'Python'
    obj[:frameworks] = ['Django', 'Flask', 'Pylons', 'TurboGears', 'Gluon']
  elsif key == 'Ruby'
    obj[:frameworks] = ['Rails', 'Nitro', 'Camping', 'Ramaze']
  elsif key == 'C#'
    obj[:frameworks] = ['.NET']
  end

  language = Language.new(obj)
  language.save
}