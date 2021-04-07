import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import dummyData from '../../../dummyData.js';
import HomeListItem from './HomeListItem/HomeListItem.jsx';
import axios from 'axios';
import './Home.css';

const Home = ({ loggedIn, setLoggedIn, username, rooms, setUserData, setCurrentRoom, userID }) => {

  // useEffect(() => {
  //   axios.get(`/connections/${username}`)
  //     .then((response) => {
  //       console.log('connections response data: ', response.data)
  //       setUserData(response.data)
  //     })
  //     .catch((err) => { console.log(`err`, err) })
  // }, [/* Conditions for useEffect to re-run */])

  useEffect(() => {
    setUserData(dummyData.dummyData)
  }, [])

  // useEffect(() => {

  // }, [rooms])

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
          <HomeListItem key={room.userID} room={room} setCurrentRoom={setCurrentRoom} />
        ))}
      </div>
      {/* <div className="home-container">
        {rooms.map((pal) => (
          <HomeListItem key={pal.userID} name={pal.name} bio={pal.bio} country={pal.country} />
        ))}
      </div> */}
    </>
  )
}

export default Home
