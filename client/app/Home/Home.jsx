import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import './Home.css';

const Home = () => {
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
  return (
    <>
      <NavBar />
      <div className="home-container">
        {/* {data.map((pal) => {
          <PalComponent key={pal.user_id} />
        })} */}
      </div>
    </>
  )
}

export default Home
