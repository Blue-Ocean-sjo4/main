import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import './NewPal/NewPal.css'
import NewPal from './NewPal/NewPal.jsx'

const NavBar = () => {

  const [showingNewPal, setShowingNewPal] = useState(false)

  function showNewPal() {
    setShowingNewPal(true)
  }

  return (
    <div className="nav-bar">
      <Link to="/" className="nav-title">
        <span>CORRESPOND</span>
      </Link>
      <span className="icon-container">
        <span className="nav-new-pal"><NewPal user_id={user_id} showingNewPal={showingNewPal} setShowingNewPal={setShowingNewPal} /><ion-icon name="add-circle-outline" onClick={showNewPal}></ion-icon></span>
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
