import React, { useState } from 'react';
import SinglePal from './SinglePal/SinglePal.jsx'
import './PalsList.css'

function PalsList({ palsList, setCurrentPal, currentPal }) {

  return (
    <div id="pals-list">
      {palsList.map((pal, i) => {
        if (pal.name !== currentPal.name) {
          return <SinglePal key={i} setCurrentPal={setCurrentPal} pal={pal} />
        } else {
          return null;
        }
      })}
    </div>
  )
}

export default PalsList