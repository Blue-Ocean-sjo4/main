import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import ProfilePage from '../ProfilePage/ProfilePage.jsx';
import Home from '../Home/Home.jsx';
import Notifications from '../Notifications/Notifications.jsx';
import MessagesPage from '../MessagesPage/MessagesPage.jsx';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});
  const [currentRoom, setCurrentRoom] = useState({});

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => (
          <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} rooms={userData.rooms} setUserData={setUserData} setCurrentRoom={setCurrentRoom} />
        )}/>
        <Route path="/login" exact render={() => (
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
        )}/>
        <Route path="/signup" exact render={() => (
          <SignUp />
        )}/>
        <Route path="/profile" exact render={() => (
          <ProfilePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )}/>
        <Route path="/notifications" exact render={() => (
          <Notifications loggedIn={loggedIn} setLoggedIn={setLoggedIn} pendingConnections={userData.pendingConnections} />
        )}/>
        <Route path="/messages" exact render={() => (
          <MessagesPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} rooms={userData.rooms} currentRoom={currentRoom} />
        )}/>
      </Switch>
    </Router>
  )
}

export default App

/*
  <Login />
  <SignUp />
  <ProfilePage />
  <Home />
  <Notifications />
  <MessagesPage />
*/