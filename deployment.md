# Heroku Deployment

## Starting
- Make sure you have a Heroku account created

## Deployment
1. From the room directory, on the terminal, type `heroku create`
  - This will create a new heroku project
2. Push the deployment branch to heroku with `git push heroku heroku-atlas-deployment:master`
3. Set up the environment variables (heroku refers to them as "Config Vars")
  1. Sign into your Heroku account on the browser
  2. Go to the app that correspons to the one you just pushed your branch to
  3. Go to Settings
  4. Go to Config Vars and click Reveal Config Vars
  5. Set the DB_IP to what we normally have it set in config.js

## Things happening behind the scenes
- There is a `heroku-postbuild` script in package.json
  - Heroku will call this during its process when the branch is pushed
  - In our case, this will tell heroku to run webpack
- The dotenv npm package is installed in order to make it easier to define and access our hidden variables
  - locally, I have a file called `.env` which contains the `PORT` and `DB_IP`
