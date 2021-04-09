import React, { useState } from 'react';
import SinglePal from './SinglePal/SinglePal.jsx'
import './PalsList.css'

function PalsList({ palsList, setCurrentPal, currentPal, setRoomID }) {

  return (
    <div id="pals-list">
      {palsList.map((pal, i) => {
        if (pal.name === currentPal.name) {
          return <SinglePal setRoomID={() => {}} isCurrentPal={true} key={i} setCurrentPal={setCurrentPal} pal={pal} />
        } else {
          return <SinglePal setRoomID={setRoomID} isCurrentPal={false} key={i} setCurrentPal={setCurrentPal} pal={pal} />
        }
      })}
    </div>
  )
}

export default PalsList