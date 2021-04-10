import React from 'react';
import { Link } from 'react-router-dom';
import './MessagesPageBanner.css';

const MessagesPageBanner = ({ name, pronouns, bio, profilePic, userID }) => {
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

      <div className="messages-page-banner-icons">
        <button className="nav-new-pal" type="button">
          <ion-icon name="person-add-outline"></ion-icon>
        </button>
        <button type="button">
          <Link className="nav-notifications" to="/notifications" >
            <ion-icon name="notifications-outline"></ion-icon>
          </Link>
        </button>
        <Link className="nav-profile" to="/profile" >
          <ion-icon name="person-circle-outline"></ion-icon>
        </Link>
      </div>

    </div>
  );
};

export default MessagesPageBanner;