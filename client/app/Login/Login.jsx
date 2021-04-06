import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    // e.preventDefault();
    // TODO: Authentication, Route to main page
    console.log('Login attempt');
    axios.post('/login', {
      username: username,
      password: password
    })
      .then((response) => {
        console.log(`response`, response)
      })
      .catch((error) => {
        console.log(`error`, error)
      })
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
