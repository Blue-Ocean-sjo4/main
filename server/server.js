const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const connectEnsureLogin = require('connect-ensure-login');
const {
  login, signup, findID,
  updateUserData, getMessages,
  findPal } = require('../database/model/queryFunctions.js');
const PORT = 1337;

passport.use(new Strategy(async (username, password, done) => {
  try {
    const userData = await login(username);
    // if username does not exist
    // userData will be null
    if (!userData) return done(null, false, 'Username does not exist');
    // if password does not match
    if (!(await bcrypt.compare(password, userData.password))) return done(null, false, 'Password does not match');
    // username exists and password matches
    return done(null, userData);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const userData = await findID(id);
    done(null, userData);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static('client/dist'));

app.post('/signup', signup);

// remember to remove this
app.get('/login', (req, res) => res.sendFile(path.resolve('client/dist/login.html')));

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('req.body', req.body);
    res.redirect(url.format({pathname: '/', query: { username: req.body.username }}));
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get(
  '/connections',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send('i am in homepage')
);

/*
*-----------------------------------------------------------*
|                                                           |
|                    Update User Data                       |
|                                                           |
*-----------------------------------------------------------*
*/

app.put('/update', connectEnsureLogin.ensureLoggedIn(), updateUserData);


/*
*-----------------------------------------------------------*
|                                                           |
|                  Get existing messages                    |
|                                                           |
*-----------------------------------------------------------*
*/
app.get('/roomMessages/:room_id', connectEnsureLogin.ensureLoggedIn(), getMessages);


app.post('/newPal/:user_id/:country_code', connectEnsureLogin.ensureLoggedIn(), findPal);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
