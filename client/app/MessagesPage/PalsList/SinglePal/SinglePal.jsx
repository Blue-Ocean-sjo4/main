import React from 'react';
import './SinglePal.css';

function SinglePal({pal}) {

  return (
    <div className="single-pal">
      <img className="pic" src={pal.pic}></img>
      {pal.name}
    </div>
  )
}

export default SinglePal;