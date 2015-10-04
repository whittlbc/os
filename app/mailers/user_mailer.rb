class UserMailer < ActionMailer::Base
  default from: 'benwhittle31@gmail.com',
          return_path: 'benwhittle31@gmail.com'

  def project_invitation(email, name, subject)
    @name = name
    mail(to: email, subject: subject)
  end
end