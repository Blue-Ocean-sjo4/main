import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import countryCodeToFlag from "country-code-to-flag";
import './HomeListItem.css';

const HomeListItem = ({ pals, roomId, name, bio, country }) => {
  // TODO: Link up with messages team, discuss fetching database messages

  return (
    <Link className="pal-messages-link" to={{
      pathname: `/messages`,
      state: {
        pals,
        roomId,
        name,
        bio,
        country
      }
    }}
    >
      <div className="pal-container" >
        <div className="pal-item-picture-container">
          <img className="pal-item-picture" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt=""></img>
        </div>
        <div className="pal-item-name">{name}</div>
        <div className="pal-item-bio">{bio}</div>
        <div className="pal-item-country">{countryCodeToFlag(country)}</div>
      </div>
    </Link>
  )
}

export default HomeListItem;
