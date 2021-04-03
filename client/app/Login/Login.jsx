import React, { useState, useEffect } from 'react'

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
    e.preventDefault();
    // To-do Authentication
    console.log('Login attempt');
  }

  return (
    <div>
      <div>Welcome</div>
      <form onSubmit={handleLogin}>
        <label>
          {'Username: '}
          <input type="text" value={username} onChange={handleUsernameChange}></input>
        </label>
        <label>
          {'Password: '}
          <input type="text" value={password} onChange={handlePasswordChange}></input>
        </label>
        <input type="submit" value="Login" ></input>
      </form>
      <div className="sign-up-link">Don't have an account? Sign up here!</div>
    </div>
  )
}

export default Login
