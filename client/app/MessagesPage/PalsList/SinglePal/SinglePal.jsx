import React from 'react';
import './SinglePal.css';
import countryCodeToFlag from 'country-code-to-flag'

function SinglePal({ pal, setCurrentPal }) {

  return (
    <div onClick={() => { setCurrentPal(pal) }} className="single-pal">
      <img className="pic" src={pal.pic}></img>
        <div className="pal-name">
          {pal.name}
        </div>
        <div className="pal-country">{countryCodeToFlag(pal.country)}</div>
    </div>
  )
}

export default SinglePal;