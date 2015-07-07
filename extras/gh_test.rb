# Provide authentication credentials
client = Octokit::Client.new(:login => 'whittlbc', :password => 'Maxine20/')
# Fetch the current user
puts client.repositories(:user => 'whittlbc')