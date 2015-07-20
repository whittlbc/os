class LanguagesController < ApplicationController

  def get_all
    all_langs = Language.all
    langs_and_frames = []
    dropdown_items = []

    all_langs.map { |lang|
      langs_and_frames.push(lang.name)
      dropdown_items.push({id: lang.name, title: lang.name})
      if !lang.frameworks.empty?
        lang.frameworks.map { |frame|
          langs_and_frames.push(frame)
          dropdown_items.push({id: frame, title: frame})
        }
      end
    }

    dropdown_items = dropdown_items.sort { |a, b| a[:title].downcase <=> b[:title].downcase }

    render :json => {:all => all_langs, :langs_and_frames => langs_and_frames, dropdown_items: dropdown_items}
  end

end
