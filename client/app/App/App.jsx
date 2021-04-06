import React from 'react';
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
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/messages" component={MessagesPage} />
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