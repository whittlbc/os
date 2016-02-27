class UserMailer < ActionMailer::Base

  default from: 'Sourcehoney <team@sourcehoney.com>', return_path: ENV['MANDRILL_USERNAME']

  LOGO = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'

  def project_invitation(email, sender_name, recipient_name, subject, project_name, project_uuid)
    @sender_name = sender_name
    @recipient_name = recipient_name
    @project_name = project_name
    @project_uuid = project_uuid
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    send_email(email, subject)
  end

  def notify_user_of_comment_reply(user: nil, comment: nil, parent_comment: nil, project: nil)
    @recipient_name = get_correct_name(user)
    @project_name = project.title
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.gh_username
    @parent_comment_text = parent_comment.text
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    project_name_abbrev = @project_name.length > 40 ? "#{@project_name[0..37]}..." : @project_name

    send_email(user.email, "Someone replied to your comment on the project: #{project_name_abbrev}")
  end

  def notify_user_of_comment(user: nil, comment: nil, project: nil)
    @recipient_name = get_correct_name(user)
    @project_name = project.title
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.gh_username
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    project_name_abbrev = @project_name.length > 40 ? "#{@project_name[0..37]}..." : @project_name

    send_email(user.email, "Someone commented on your project: #{project_name_abbrev}")
  end

  def notify_team_of_team_comment(user: nil, comment: nil, project: nil)
    @recipient_name = get_correct_name(user)
    @project_name = project.title
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.gh_username
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    project_name_abbrev = @project_name.length > 40 ? "#{@project_name[0..37]}..." : @project_name

    send_email(user.email, "Someone left a team comment in #{project_name_abbrev}")
  end

  def welcome(user: nil)
    @recipient_name = get_correct_name(user)
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    send_email(user.email, 'Welcome to Sourcehoney!')
  end

  def notify_user_of_implementation(user: nil, project: nil, poster_name: nil)
    @recipient_name = get_correct_name(user)
    @project_name = project.title
    @project_uuid = project.uuid
    @poster_name = poster_name
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    project_name_abbrev = @project_name.length > 40 ? "#{@project_name[0..37]}..." : @project_name

    send_email(user.email, "Someone added an implementation to your project: #{project_name_abbrev}")
  end

  def requesting_feedback_from_user(requestee_name: nil, requestee_email: nil, requester: nil, project: nil)
    @recipient_name = requestee_name || 'fellow OSS lover'
    @requester_name = get_correct_name(requester, full_name: true)
    @project_name = project.title
    @project_uuid = project.uuid
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    send_email(requestee_email, "Someone requested your feedback on a project")
  end

  def site_invitation(recipient_email: nil, inviter: nil)
    @inviter_name = get_correct_name(inviter)
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    send_email(recipient_email, "Someone invited you to join Sourcehoney")
  end

  def tagged_in_comment(taggee_name: nil, taggee_email: nil, tagger: nil, project: nil, comment: nil)
    @taggee_name = taggee_name
    @tagger_name = get_correct_name(tagger)
    @project_name = project.title
    @project_uuid = project.uuid
    @comment_text = comment.text
    @comment_uuid = comment.uuid
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    send_email(taggee_email, "Someone tagged you in a comment")
  end

  def received_suggestion(user)
    @recipient_name = get_correct_name(user)
    @company_logo = LOGO

    send_email(user.email, 'Thanks for the suggestion!')
  end

  def notify_admin_of_suggestion(user: nil, text: nil)
    @username = user.present? ? user.gh_username : 'Unauthed User'
    @text = text
    @redirect_base_url = ENV['URL']
    @company_logo = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'

    send_email(ENV['ADMIN_EMAIL'], 'New Suggestion!')
  end

  def get_correct_name(user, full_name: false)
    name = user.try(:name)

    if name.try(:present?)
      full_name ? name : name.split(' ')[0]
    else
      user.try(:gh_username)
    end
  end

  def send_email(email, subject)
    if email.present?
      if ENV['MAILER_PERFORM_DELIVERIES'].try(:downcase) == 'true'
        puts "SENDING EMAIL TO: #{email}"
        mail(to: ((ENV['OVERRIDE_EMAIL'].try(:downcase) == 'true') ? ENV['MAIL_TO_OVERRIDE'] : email), subject: subject)
      else
        puts 'NOT SENDING EMAIL: EMAIL EXISTS, BUT MAILER_PERFORM_DELIVERIES WAS FALSE'
      end
    else
      puts 'NOT SENDING EMAIL: USER DOES NOT HAVE EMAIL ADDRESS'
    end
  end

end
