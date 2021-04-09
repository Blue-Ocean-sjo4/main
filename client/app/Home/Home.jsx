import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import dummyData from '../../../dummyData.js';
import HomeListItem from './HomeListItem/HomeListItem.jsx';
import axios from 'axios';
import './Home.css';

const Home = ({ userID, loggedIn, setLoggedIn, username="", rooms = [], setUserData, setCurrentRoom, toggleDarkMode, darkMode }) => {

  useEffect(() => {
    axios.get(`/connections?username=${username}`)
      .then((response) => {
        console.log('connections response data: ', response.data)
        setUserData(response.data)
      })
      .catch((err) => { console.log(`err`, err) })
  }, [])

  // useEffect(() => {
  //   setUserData(dummyData.dummyData)
  // }, [])

  if (!loggedIn) {
    return (
      <Redirect to="/login" />
    )
  }


  return (
    <>
      <NavBar userID={userID} />
      <div className="home-container">
        {rooms.map((room, index) => (
          <HomeListItem key={index} room={room} setCurrentRoom={setCurrentRoom} />
        ))}
      </div>
      {/* <div className="home-container">
        {rooms.map((pal) => (
          <HomeListItem key={pal.userID} name={pal.name} bio={pal.bio} country={pal.country} />
        ))}
      </div> */}
      <div className='darkModeButton'>
        <label>
          <input onClick={toggleDarkMode} type="checkbox"></input>
          <span className={ darkMode? 'slider round dark': 'slider round' }>
            {
              !darkMode?
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
    </>
  )
}

export default Home
