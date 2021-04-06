import React, { useState, useEffect } from 'react';

function NewPal() {

  const hideModal = () => {
    var modal = document.getElementById('newPal')
    modal.style.display = "none";
  }


  return (
    <div className="new-pal">
      <div id="newPal" className="new-pal-modal">
        <span className="new-pal-modal-close" onClick={(e) => { hideModal(e); }} >&times;</span>
      </div>
    </div>
  )
}

export default NewPal;