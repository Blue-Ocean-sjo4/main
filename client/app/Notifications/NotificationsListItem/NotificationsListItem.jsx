import React, { useState, useEffect } from 'react';
import countryCodeToFlag from "country-code-to-flag";
import './NotificationsListItem.css';

const NotificationsListItem = ({ name, bio, country }) => {

  // TODO: button handlers

  return (
    <>
      <div className="connection-container">
        <div className="connection-item-picture-container">
          <img className="connection-item-picture" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt=""></img>
        </div>
        {/* <img className="connection-item-picture" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt=""></img> */}
        <div className="connection-item-name">{name}</div>
        <div className="connection-item-bio">{bio}</div>
        <div className="connection-item-country">{countryCodeToFlag(country)}
        </div>
        <button className="accept-connection">Accept</button>
        <button className="deny-connection">Deny</button>
      </div>
    </>
  )
}

export default NotificationsListItem;
