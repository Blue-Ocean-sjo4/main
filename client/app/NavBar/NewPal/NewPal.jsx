import React, { useState, useEffect } from 'react';
import './NewPal.css'

function NewPal({ showingNewPal, setShowingNewPal }) {

  function closeModal() {
    setShowingNewPal(false)
  }

  return (
    <div>
      {
        showingNewPal ?
          <div id="newPal" className="new-pal-modal">
            <div className="new-pal-modal-content">
              <span className="new-pal-modal-close" onClick={closeModal} >&times;</span>
              hello yes this is a modal window
            </div>
          </div> : null
      }

    </div>
  )
}

export default NewPal;