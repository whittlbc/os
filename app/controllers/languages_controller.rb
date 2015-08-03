class LanguagesController < ApplicationController

  def get_all

    all_langs = Language.all.map { |lang|
      {
          :id => lang[:id],
          :name =>lang[:name],
          :color => lang[:color],
          :frameworks => lang[:frameworks]
      }
    }

    colors_and_initials = {}

    all_frames = {}
    dropdown_items = []

    all_langs.map { |lang|
      colors_and_initials[lang[:name]] = {
          :color => lang[:color]
      }
      dropdown_items.push({id: lang[:name], title: lang[:name]})
      if !lang[:frameworks].empty?
        lang[:frameworks].map { |frame|
          all_frames[frame] = lang[:name]
          dropdown_items.push({id: frame, title: frame})
          colors_and_initials[frame] = {
              :color => lang[:color]
          }
        }
      end
    }

    dropdown_items = dropdown_items.sort { |a, b| a[:title].downcase <=> b[:title].downcase }

    render :json => {:colors_and_initials => colors_and_initials, :all_frames => all_frames, dropdown_items: dropdown_items}
  end

end
