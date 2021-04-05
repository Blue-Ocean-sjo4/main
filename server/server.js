const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const connectEnsureLogin = require('connect-ensure-login');
const { login, signup, findID } = require('/database/model/queryFunctions.js');
const PORT = 1337;

passport.use(new Strategy(async (username, password, done) => {
  try {
    const userData = await login(username);
    console.log(userData, username, password);
    // if username does not exist
    // userData will be null
    if (!userData) return done(null, false, 'Username does not exist');
    // if password does not match
    if (userData.password !== password) return done(null, false, 'Password does not match');
    console.log(1);
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
    console.log(2);
    done(null, userData);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static('/client/dist'));

app.post('/signup', signup);

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
  console.log('hit');
  res.redirect('/home');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/connections', connectEnsureLogin.ensureLoggedIn(),
  (req, res) =>
);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

/*
// Requirements
const express = require('express');
const passport = require('passport');
const db = require('../database/model/queryFunctions.js');
const app = express();
const PORT = 3000;
const flash = require('express-flash');
// Middleware

app.get('/login', db.login);
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login',
                                                    failureFlash: true }));

app.post('/signup', db.signup);

app.use(express.static(__dirname + '/../client/dist'));

// Routing



// Listener
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
*/