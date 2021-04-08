import React, { useState, useEffect } from 'react';
import countryCodeToFlag from "country-code-to-flag";
import axios from 'axios';
import './NotificationsListItem.css';

const NotificationsListItem = ({ userID, palID, name, bio, country }) => {
  const [buttonsDisplay, setButtonsDisplay] = useState(0);

  let buttonClass = buttonsDisplay === 0 ? "notification-buttons" : "notification-buttons-hidden";
  let acceptedClass = buttonsDisplay === 1 ? "clicked-accepted" : "clicked-accepted-hidden"
  let rejectedClass = buttonsDisplay === 2 ? "clicked-rejected" : "clicked-rejected-hidden"
  // TODO: button handlers
  const handleAcceptPal = (e) => {
    e.preventDefault();
    axios.put(`/acceptPal/${userID}/${palID}`)
    .then((response) => {
      // TODO: add modal notification here OR remove that notification from the DOM (or indicate in some way that is is accepted)
      console.log('pal accepted');
      setButtonsDisplay(1);
    })
    .catch((error) => {
      console.log(`error: `, error);
    })
  }

  const handleDenyPal = (e) => {
    e.preventDefault();
    axios.put(`/rejectPal/${userID}/${palID}`)
    .then((response) => {
      console.log('pal rejected');
      setButtonsDisplay(2);
    })
    .catch((error) => {
      console.log('ERROR: ', error);
    })
  }

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
        <div className={buttonClass} >
          {/* TODO: make these buttons appear as a green rectangle with white check mark and a red rectangle with white x */}
          <button className="accept-connection" onClick={handleAcceptPal} >&#10003;</button>
          <button className="deny-connection" onClick={handleDenyPal}>&#10005;</button>
        </div>
        <div className={acceptedClass}>
          Accepted
        </div>
        <div className={rejectedClass}>
          Declined
        </div>
      </div>
    </>
  )
}

export default NotificationsListItem;
