import React, { useState, useEffect } from 'react';
import './SinglePal.css';
import countryCodeToFlag from 'country-code-to-flag'

function SinglePal({ pal, setCurrentPal, isCurrentPal, setRoomID }) {

  return (
    <div onClick={() => { setCurrentPal(pal); setRoomID(pal.roomID) }} className={isCurrentPal ? "single-pal is-current-pal" : "single-pal"}>
      <img className="pic" src={pal.pic}></img>
      <div className="pal-name">
        {pal.name}
        <div className="pal-pronouns">{pal.pronouns}</div>
      </div>
      <div className="pal-country">{countryCodeToFlag(pal.country)}</div>
    </div>
  )
}

export default SinglePal;