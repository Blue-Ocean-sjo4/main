import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import dummyData from '../../../dummyData.js';
import HomeListItem from './HomeListItem/HomeListItem.jsx';
import axios from 'axios';
import './Home.css';

const Home = ({ userID, loggedIn, setLoggedIn, username="", rooms = [], setUserData, setCurrentRoom, userData }) => {

  useEffect(() => {
    if (username) {
      axios.get(`/connections?username=${username}`)
      .then((response) => {
        console.log('connections response data: ', response.data)
        setUserData(response.data)
      })
      .catch((err) => { console.log(`err`, err) });
    }
  }, [username])

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
    </>
  )
}

export default Home
