import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import './ProfilePage.css';

const ProfilePage = () => {

  const [profilePicture, setProfilePicture] = useState(''); /* Consider data type from backend */
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    // Fetch user data
    // Set states with data
  }, [])

  const handlePictureUpload = (e) => {
    // TODO: Send picture to storage API, then post URL to database
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value)
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value)
  };
  const handlePronounsChange = (e) => {
    setPronouns(e.target.value)
  };
  const handleBioChange = (e) => {
    setBio(e.target.value)
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-header header">Username's Profile</div>
        <div className="profile-pic-container">
          <div className="profile-pic-cropper">
            <img className="profile-pic-display" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="avatar" />
          </div>
          <label className="profile-pic-upload">
            <input type="file"></input>
            UPLOAD
          </label>
        </div>
        <form className="profile-details">
          <label>
            Username
          <br></br>
            <input className="profile-username profile-input" type="text"  placeholder="YOUR USERNAME" value={username}></input>
          </label>
          <br></br>
          <label>
            Country
          <br></br>
            <input className="profile-country profile-input" type="text" onChange={handleCountryChange} placeholder="YOUR COUNTRY" value={country}></input>
          </label>
          <br></br>
          <label>
            Gender
          <br></br>
            <select className="profile-gender profile-input" value={gender} onChange={handleGenderChange}>
              <option value="">GENDER</option>
              <option value="cis-man">CIS MAN</option>
              <option value="cis-woman">CIS WOMAN</option>
              <option value="trans-man">TRANS MAN</option>
              <option value="trans-woman">TRANS WOMAN</option>
              <option value="non-binary">NON-BINARY</option>
            </select>
          </label>
          <br></br>
          <label>
            Pronouns
          <br></br>
            <input className="profile-pronouns profile-input" type="text" onChange={handlePronounsChange} placeholder="YOUR PROUNOUNS" value={pronouns}></input>
          </label>
          <br></br>
          <label>
            Bio
          <br></br>
            <textarea className="profile-bio profile-input" type="text" onChange={handleBioChange} placeholder="YOUR BIO" value={bio} maxlength="240"></textarea>
          </label>
          <br></br>
          <input className="profile-update-button" type="submit" value="UPDATE PROFILE"></input>
        </form>
      </div>
    </>
  )
}

export default ProfilePage
