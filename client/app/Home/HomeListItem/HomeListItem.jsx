import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import countryCodeToFlag from "country-code-to-flag";
import './HomeListItem.css';

const HomeListItem = ({ room, setCurrentRoom }) => {
  // TODO: Link up with messages team, discuss fetching database messages

  const handleRemove = (e) => {
  }

  return (
    <Link className="pal-messages-link" to="/messages" onClick={() => {
      setCurrentRoom({ room })
    }}>
      <div className="pal-container" >
        <div className="pal-item-picture-container">
          <img className="pal-item-picture" src={room.profilePicture ? room.profilePicture : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' }
          />
        </div>
        <div className="pal-item-name">{room.name}</div>
        <div className="pal-item-bio">{room.bio}</div>
        <div className="pal-item-country">{countryCodeToFlag(room.country)}</div>
      </div>
    </Link>
  )
}

export default HomeListItem;
