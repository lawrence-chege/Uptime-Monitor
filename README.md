# Uptime-Monitor
A up-time monitor
 - Users can enter urls they want monitored
 - Users can recieve alerts when the resources go down or come back up
 - Users can sign up , sign in and sign out
 - Users can get sms alerts instead of email

*Requirements*
- API listens on a port and accepts incoming HTTP requests for POST, GET , PUT, DELETE, HEAD.
- Allow a client to connect then create a new user, edit and delete that user
- The API allows a user to sign in, gives them a token they can use for subsequent auth requests
- The API allows the user to sign out and invalidates their token
- Allow a signed-in user to sign out and invalidates their token
- Allow a signed-in user to use their token to create a newcheck
- In the background, workers perform 'checks' at appropriate times, and send alerts to the users when a check changes its state from'up' to 'down' an viseversa
- 
