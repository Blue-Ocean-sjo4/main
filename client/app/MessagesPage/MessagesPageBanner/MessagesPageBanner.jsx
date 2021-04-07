import React from 'react';
import { Link } from 'react-router-dom';
import './MessagesPageBanner.css';

const MessagesPageBanner = ({ name, pronouns, bio, profilePic }) => {
  return (
    <div id="messages-page-banner-container" >

      <button type="button" className="messages-page-back" >
        <Link to="/" >
          <i className="fas fa-arrow-left messages-page-back-arrow" />
        </Link>
      </button>

      <img className="current-pal-profile-pic" src={profilePic} alt="Pal's Profile Picture"></img>

      <div className="current-pal-info" >
        <p className="pal-name">{`${name} | ${pronouns}`}</p>
        <p className="pal-bio">{bio}</p>
      </div>

      <div className="messages-page-banner-icons">
        <button type="button">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
        <button type="button">
          <Link to="/notifications" >
            <ion-icon name="notifications-circle-outline"></ion-icon>
          </Link>
        </button>
        <Link to="/profile" >
          <ion-icon name="ellipse-outline" id="my-profile"></ion-icon>
        </Link>
      </div>

    </div>
  );
};

export default MessagesPageBanner;