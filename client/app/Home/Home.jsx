import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../NavBar/NavBar.jsx';
import dummyData from '../../../dummyData.js';
import HomeListItem from './HomeListItem/HomeListItem.jsx';
import RemovePal from './RemovePal/RemovePal.jsx';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = ({ userID, loggedIn, setLoggedIn, username = "", rooms = [], setUserData, setCurrentRoom, userData }) => {

  const notifyTest = () => {
    toast('Poggers in the chat');
  }

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
          <div className="home-list-item-container">
            <HomeListItem key={index} room={room} setCurrentRoom={setCurrentRoom} />
            {/* <RemovePal /> */}
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
