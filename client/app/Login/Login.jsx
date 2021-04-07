import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ loggedIn, setLoggedIn }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Authentication, Route to main page
    axios.post('/login', {
      username: username,
      password: password
    })
      .then((response) => {
        console.log('Login success');
        console.log(`response`, response)
        setLoggedIn(true)
      })
      .catch((error) => {
        console.log('Login failure');
        console.log(`error`, error)
      })
  }

  console.log(loggedIn);

  if (loggedIn) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div className="login-container">
      <div className="login-header header">Welcome!</div>
      <form onSubmit={handleLogin}>
        <label>
          {'Username '}<br></br>
          <input type="text" onChange={handleUsernameChange} className="login-input"></input>
        </label><br></br>
        <label>
          {'Password '}<br></br>
          <input type="password" onChange={handlePasswordChange} className="login-input"></input>
        </label><br></br>
        <input type="submit" value="LOGIN" className="login-button"></input>
      </form>
      <Link to="/signup" className="sign-up-link" >Don't have an account? Sign up here!</Link>
    </div>
  )
}

export default Login
