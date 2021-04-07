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
  login, signup, findID, findUserData,
  updateUserData, getMessages,
  findPal, getConnections, acceptPal,
  rejectPal, saveMessages } = require('../database/model/queryFunctions.js');
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
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer);

io.use((socket, next) => {
  socket.room = socket.handshake.auth.room;
  socket.username = socket.handshake.auth.username;
  // console.log(socket.room);
  // console.log(socket.username);
  next();
});

io.on('connection', socket => {
  console.log('room inside connection', socket.room);
  // console.log('socket', socket);
  // console.log(`user ${socket.id} connected!`);
  socket.join(socket.room);
  // send new message
  socket.on('send new message', ({ msg, room, senderID }) => {
    console.log(msg);

    //send data to queryFunctions through saveMessages
    saveMessages(room, msg, senderID);
    // console.log('this is the sender\'s socketID', socketID);
    socket.to(room).emit('receive new message', { msg, 'otherSocketID': 'somesocket' });
  });
  // receive new message
  socket.on('disconnecting', () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

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
app.use(express.static(path.resolve('client/dist')));

app.post('/signup', signup);

app.post(
  '/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log('req.body', req.body);
    // res.redirect(url.format({pathname: '/', query: { username: req.body.username }}));
    res.send('Success');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/connections', connectEnsureLogin.ensureLoggedIn(), findUserData);
// app.get('/connections', findUserData);

/*
*-----------------------------------------------------------*
|                    Update User Data                       |
*-----------------------------------------------------------*
*/

app.put('/update', connectEnsureLogin.ensureLoggedIn(), updateUserData);

// app.post('/test', test);
/*
*-----------------------------------------------------------*
|                  Get existing messages                    |
*-----------------------------------------------------------*
*/
app.get('/roomMessages/:room_id', connectEnsureLogin.ensureLoggedIn(), getMessages);

// app.post('/newPal/:user_id/:country_code', connectEnsureLogin.ensureLoggedIn(), findPal);
app.post('/newPal/:user_id/:country', findPal);
app.put('/acceptPal/:user_id/:user_pal_id', acceptPal);
app.put('/rejectPal/:user_id/:user_pal_id', rejectPal);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


httpServer.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
