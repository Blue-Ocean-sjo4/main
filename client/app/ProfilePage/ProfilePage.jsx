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

  const handlePictureUpload = () => {};
  const handleUsernameChange = () => {};
  const handleCountryChange = () => {};
  const handleGenderChange = () => {};
  const handlePronounsChange = () => {};
  const handleBioChange = () => {};

  return (
    <div>
      <div className="profile-header header">Username</div>
      <form>
        <label>
          <div className="profile-picture-display">ProfilePictureHere</div>
          <input className="profile-picture-upload" type="file"></input>
        </label>
        <label>
          Username:
          <input className="profile-" type="text" onChange={ handleUsernameChange } placeholder="YOUR USERNAME" value={username}></input>
        </label>
        <label>
          Country:
          <input className="profile-" type="text" onChange={ handleCountryChange } placeholder="YOUR COUNTRY" value={country}></input>
        </label>
        <label>
          Gender:
          <input className="profile-" type="text" onChange={ handleGenderChange } placeholder="CIS MAN / CIS WOMAN / TRANS MAN / TRANS WOMAN / NON-BINARY" value={gender}></input>
        </label>
        <label>
          Pronouns:
          <input className="profile-" type="text" onChange={ handlePronounsChange } placeholder="YOUR PROUNOUNS" value={pronouns}></input>
        </label>
        <label>
          Bio:
          <input className="profile-" type="text" onChange={ handleBioChange } placeholder="YOUR BIO" value={bio}></input>
        </label>
      </form>
    </div>
  )
}

export default ProfilePage
