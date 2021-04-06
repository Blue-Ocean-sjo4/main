import React, { useState, useEffect } from 'react';
import './NewPal.css'

function NewPal({ newPalClass, setNewPalClass }) {

  function hideNewPal() {
    setNewPalClass('new-pal-modal-hidden');
  }

  return (
    <div id="newPal" className={newPalClass}>
      <div className="new-pal-modal-content">
        <span className="new-pal-modal-close" onClick={hideNewPal} >&times;</span>
        hello yes this is a modal window
        </div>
    </div>
  )
}

export default NewPal;