import React, { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <span className="nav-title">CORRESPOND</span>
      <span className="icon-container">
        <span className="nav-connection"><ion-icon name="add-circle-outline"></ion-icon></span>
        <span className="nav-notifications"><ion-icon name="notifications-circle-outline"></ion-icon></span>
        <span className="nav-profile"><ion-icon name="ellipse-outline"></ion-icon></span>
      </span>
    </div>
  )
}

export default NavBar
