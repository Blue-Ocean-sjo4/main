import React, { useState, useEffect } from 'react';
import './NavBar.css';
import NewPal from './NewPal/NewPal.jsx'

const NavBar = () => {

  function showNewPal(e) {
    var modal = document.getElementById('new-pal');
    modal.style.display = "block";
  }

  return (
    <div className="nav-bar">
      <span className="nav-title">CORRESPOND</span>
      <span className="icon-container">
        <span className="nav-new-pal" onClick={showNewPal} ><NewPal /><ion-icon name="add-circle-outline"></ion-icon></span>
        <span className="nav-notifications"><ion-icon name="notifications-circle-outline"></ion-icon></span>
        <span className="nav-profile"><ion-icon name="ellipse-outline"></ion-icon></span>
      </span>
    </div>
  )
}

export default NavBar
