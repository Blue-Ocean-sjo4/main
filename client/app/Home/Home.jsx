import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import dummyData from '../../../dummyData.js';
import HomeListItem from './HomeListItem/HomeListItem.jsx';
import axios from 'axios';
import './Home.css';

const Home = ({ loggedIn, setLoggedIn, username }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`/connections/${username}`)
      .then((response) => {
        console.log('connections response data: ', response.data)
        setRooms(response.data.rooms)
      })
      .catch((err) => { console.log(`err`, err) })
  }, [])

  if (!loggedIn) {
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <>
      <NavBar />
      <div className="home-container">
        {dummyData.dummyData.rooms.map((pal) => (
          <HomeListItem key={pal.user_id} roomId={pal.roomId} name={pal.name} bio={pal.bio} country={pal.country} />
        ))}
      </div>
      {/* <div className="home-container">
        {rooms.map((pal) => (
          <HomeListItem key={pal.user_id} name={pal.name} bio={pal.bio} country={pal.country} />
        ))}
      </div> */}
    </>
  )
}

export default Home
