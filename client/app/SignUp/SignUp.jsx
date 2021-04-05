import React, { useState, useEffect } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpCountry, setSignUpCountry] = useState('')
  const [signUpBirthdate, setSignUpBirthdate] = useState('')

  const handleUsernameChange = (e) => {
    setSignUpUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setSignUpPassword(e.target.value)
  }
  const handleEmailChange = (e) => {
    setSignUpEmail(e.target.value)
  }
  const handleCountryChange = (e) => {
    setSignUpCountry(e.target.value)
  }
  const handleBirthdateChange = (e) => {
    setSignUpBirthdate(e.target.value)
  }
  const handleSignUpSubmit = (e) => {
    // TODO: Post to database, Route to profile
    console.log('Sign up submitted: ', e)
  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-header header">Sign Up</div>
      <form onSubmit={handleSignUpSubmit}>
        <label>
          Username
          <br></br>
          <input className="sign-up-username sign-up-input" type="text" onChange={handleUsernameChange} required></input>
        </label><br></br>
        <label>
          Password
          <br></br>
          <input className="sign-up-password sign-up-input" type="text" onChange={handlePasswordChange} required></input>
        </label>
        <br></br>
        <label>
          Email
          <br></br>
          <input className="sign-up-email sign-up-input" type="text" onChange={handleEmailChange} required></input>
        </label>
        <br></br>
        <label>
          Country
          <br></br>
          <input className="sign-up-country sign-up-input" type="text" onChange={handleCountryChange} required></input>
        </label>
        <br></br>
        <label>
          Birthdate
          <br></br>
          <input className="sign-up-birthdate sign-up-input" type="text" onChange={handleBirthdateChange} placeholder="MM/DD/YYYY" required></input>
        </label>
        <br></br>
        <input type="submit" value="SIGNUP" className="sign-up-button"></input>
      </form>
      <div className="sign-up-login-link">Already have an account? Log in here!</div>
    </div>
  )
}

export default SignUp
