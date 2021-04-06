import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Link to="/" className="nav-title">
        <span>CORRESPOND</span>
      </Link>
      <span className="icon-container">
        <span className="nav-new-pal"><ion-icon name="add-circle-outline"></ion-icon></span>
        <Link to="/notifications" className="nav-notifications">
          <span><ion-icon name="notifications-circle-outline"></ion-icon></span>
        </Link>
        <Link to="/profile" className="nav-profile">
          <span><ion-icon name="ellipse-outline"></ion-icon></span>
        </Link>
      </span>
    </div>
  )
}

export default NavBar
