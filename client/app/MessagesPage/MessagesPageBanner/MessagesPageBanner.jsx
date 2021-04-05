import React from 'react';
import './MessagesPageBanner.css';

const MessagesPageBanner = () => {
  return (
    <div id="messages-page-banner-container" >
      <button className="messages-page-back" type="button">back</button>
      <img className="current-pal-profile-pic" src="https://wondersinthedark.files.wordpress.com/2012/09/the-big-lebowski-1.jpg" alt="Pal's Profile Picture"></img>
      <div>
        <div>Pal's name</div>
        <div>Pal's bio</div>
      </div>
      <button type="button">Add new pal</button>
      <button type="button">notifications</button>
      <div>my profile</div>
    </div>
  );
};

export default MessagesPageBanner;