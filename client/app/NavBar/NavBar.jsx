import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import './NewPal/NewPal.css'
import NewPal from './NewPal/NewPal.jsx'

const NavBar = ({ userID, darkMode, toggleDarkMode }) => {
  const [showingNewPal, setShowingNewPal] = useState(false)

  function showNewPal() {
    setShowingNewPal(true)
  }

  console.log(darkMode);

  return (
    <div className="nav-bar">
      <div className='darkModeButton'>
        <label>
          <input onClick={toggleDarkMode} type="checkbox"></input>
          <span className={ darkMode ? 'slider round dark': 'slider round' }>
            {
              !darkMode
              ?
              <div id='darkModeMoon'>
                <ion-icon name="moon"></ion-icon>
              </div>
              :
              <div id='darkModeSun'>
                <ion-icon name="sunny"></ion-icon>
              </div>
            }
          </span>
        </label>
      </div>
      <Link to="/" className="nav-title">
        <span>CORRESPOND</span>
      </Link>
      <span className="icon-container">
        <span className="nav-new-pal">
          <NewPal userID={userID} showingNewPal={showingNewPal} setShowingNewPal={setShowingNewPal} />
          <ion-icon name="person-add-outline" onClick={showNewPal} ></ion-icon>
        </span>
        <Link to="/notifications" className="nav-notifications">
          <span><ion-icon name="notifications-outline"></ion-icon></span>
        </Link>
        <Link to="/profile" className="nav-profile">
          <span><ion-icon name="person-circle-outline"></ion-icon></span>
        </Link>
        <span className="nav-profile" >
          {/* <button onClick={() => window.location.reload()}>Log Out</button> */}
          <ion-icon onClick={() => window.location.reload()} name="log-out-outline"></ion-icon>
        </span>
      </span>
    </div>
  )
}

export default NavBar
