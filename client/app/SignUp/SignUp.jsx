import React, { useState, useEffect } from 'react'

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
    <div>
      <div className="sign-up-header header">Sign Up</div>
      <form onSubmit={handleSignUpSubmit}>
        <label>
          Username:
          <input className="sign-up-username sign-up-input" type="text" value={ signUpUsername } onChange={handleUsernameChange} required></input>
        </label>
        <label>
          Password:
          <input className="sign-up-password sign-up-input" type="text" value={ signUpPassword } onChange={handlePasswordChange} required></input>
        </label>
        <label>
          Email:
          <input className="sign-up-email sign-up-input" type="text" value={ signUpEmail } onChange={handleEmailChange} required></input>
        </label>
        <label>
          Country
          <input className="sign-up-country sign-up-input" type="text" value={ signUpUsername } onChange={handleCountryChange} required></input>
        </label>
        <label>
          Birthdate:
          <input className="sign-up-birthdate sign-up-input" type="text" value={ signUpBirthdate } onChange={handleBirthdateChange} placeholder="MM/DD/YYYY" required></input>
        </label>
        <input type="submit" value="SIGNUP"></input>
      </form>
      <div className="sign-up-login">Already have an account? Log in here!</div>
    </div>
  )
}

export default SignUp
