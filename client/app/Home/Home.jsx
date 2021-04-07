import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import dummyData from '../../../dummyData.js';
import HomeListItem from './HomeListItem/HomeListItem.jsx';
import './Home.css';

const Home = ({ loggedIn, setLoggedIn }) => {
  const [rooms, setRooms] = useState([]);

  // Will need to retrieve username from URL

  useEffect(() => {
    // Use username
    // GET connections
    // axios.get('/connections')
    // .then((response) => {
    // setRooms(response.data.rooms)
    // })
    // .catch((err) => {console.log(`err`, err)})
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
          <HomeListItem key={pal.user_id} name={pal.name} bio={pal.bio} country={pal.country} />
        ))}
      </div>
    </>
  )
}

export default Home
