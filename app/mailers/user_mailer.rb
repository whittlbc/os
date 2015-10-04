class UserMailer < ActionMailer::Base
  default from: 'benwhittle31@gmail.com',
          return_path: 'benwhittle31@gmail.com'

  layout 'project_invitation'

  def project_invitation(email, name, subject)
    @name = name
    mail = mail(to: email, subject: subject)
    mail.deliver
  end
end