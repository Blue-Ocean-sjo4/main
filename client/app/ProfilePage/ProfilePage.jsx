import React, { useState, useEffect } from 'react';

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
    <div>
      <div className="profile-header header">Username's Profile</div>
      <div className="profile-picture-display">ProfilePictureHere</div>
      <input className="profile-picture-upload" type="file"></input>
      <form>
        <label>
          Username:
          <input className="profile-username" type="text" onChange={handleUsernameChange} placeholder="YOUR USERNAME" value={username}></input>
        </label>
        <label>
          Country:
          <input className="profile-country" type="text" onChange={handleCountryChange} placeholder="YOUR COUNTRY" value={country}></input>
        </label>
        <label>
          Gender:
          <select className="profile-gender" value={gender} onChange={handleGenderChange}>
            <option>GENDER</option>
            <option value="cis-man">CIS MAN</option>
            <option value="cis-woman">CIS WOMAN</option>
            <option value="trans-man">TRANS MAN</option>
            <option value="trans-woman">TRANS WOMAN</option>
            <option value="non-binary">NON-BINARY</option>
          </select>
        </label>
        <label>
          Pronouns:
          <input className="profile-pronouns" type="text" onChange={handlePronounsChange} placeholder="YOUR PROUNOUNS" value={pronouns}></input>
        </label>
        <label>
          Bio:
          <input className="profile-bio" type="text" onChange={handleBioChange} placeholder="YOUR BIO" value={bio}></input>
        </label>
        <input type="submit" value="UPDATE PROFILE"></input>
      </form>
    </div>
  )
}

export default ProfilePage
