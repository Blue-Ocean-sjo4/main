import React, { useState } from 'react';
import SinglePal from './SinglePal/SinglePal.jsx'
import './PalsList.css'

function PalsList({palsList}) {

  return (
    <div id="pals-list">
      {palsList.map((pal) => {
        return <SinglePal pal={pal}/>
      })}
      </div>
  )
}

export default PalsList