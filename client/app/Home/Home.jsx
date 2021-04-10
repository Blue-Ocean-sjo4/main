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

  const [listItemClass, setListItemClass] = useState("home-list-item-container")

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
        <div className="home-header">PAL LIST</div>
        {rooms.length > 0 ?
        rooms.map((room, index) => (
          <div className={listItemClass} key={index} >
            <HomeListItem room={room} setCurrentRoom={setCurrentRoom} />
            <RemovePal userID={userID} palID={room.userID} roomID={room.roomID} setListItemClass={setListItemClass} />
          </div>
        )) : 
        <div className="home-empty-list">Make a pal by clicking the <ion-icon name="person-add-outline"></ion-icon> icon in the navigation bar</div>
        }
      </div>
    </>
  )
}

export default Home
