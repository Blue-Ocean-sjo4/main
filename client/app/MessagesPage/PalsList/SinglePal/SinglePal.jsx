import React, { useState, useEffect } from 'react';
import './SinglePal.css';
import countryCodeToFlag from 'country-code-to-flag'

function SinglePal({ pal, setCurrentPal, isCurrentPal, setRoomID }) {

  return (
    <div onClick={() => { setCurrentPal(pal); setRoomID(pal.roomID) }} className={isCurrentPal ? "single-pal is-current-pal" : "single-pal"}>
      {/* <img className="pal-pic profile-pic-display" src={pal.pic} onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
      }}
      /> */}
      <img
        className="pal-pic"
        src={
          pal.pic
            ? pal.pic
            : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
          }
      />
      {/* <img className="pic" src={pal.pic}></img> */}
      <div className="pal-name">
        {pal.name}
        <div className="pal-pronouns">{pal.pronouns}</div>
      </div>
      <div className="pal-country">{countryCodeToFlag(pal.country)}</div>
    </div>
  )
}

export default SinglePal;