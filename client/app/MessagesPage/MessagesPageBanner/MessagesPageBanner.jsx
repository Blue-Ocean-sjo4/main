import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MessagesPageBanner.css';
import NewPal from '../../NavBar/NewPal/NewPal.jsx'
import '../../NavBar/NewPal/NewPal.css'

const MessagesPageBanner = ({ name, pronouns, bio, profilePic, userID }) => {

  const [showingNewPal, setShowingNewPal] = useState(false)

  function showNewPal() {
    setShowingNewPal(true)
  }

  return (
    <div id="messages-page-banner-container" >

      <button type="button" className="messages-page-back" >
        <Link to="/" >
          <i className="fas fa-arrow-left messages-page-back-arrow" />
        </Link>
      </button>

      <img
        className="current-pal-profile-pic"
        src={
          profilePic
            ? profilePic
            : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
        }
      />
      {/* <img className="current-pal-profile-pic" src={profilePic} alt="Pal's Profile Picture"></img> */}

      <div className="current-pal-info" >
        <p className="pal-name">{`${name} ${pronouns ? `| ${pronouns}` : ''}`}</p>
        <p className="pal-bio">{bio}</p>
      </div>

      <span className="messages-page-banner-icons">
        <span>
          <Link to="/notifications" >
            <ion-icon name="notifications-outline"></ion-icon>
          </Link>
        </span>
        <Link to="/profile" >
          <ion-icon name="person-circle-outline"></ion-icon>
        </Link>
      </span>

    </div>
  );
};

export default MessagesPageBanner;



