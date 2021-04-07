import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import NotificationsListItem from './NotificationsListItem/NotificationsListItem.jsx';
import dummyData from '../../../dummyData.js';
import './Notifications.css'

const Notifications = ({ loggedIn, setLoggedIn }) => {
  const [pendingConnections, setPendingConnections] = useState([]);

  // Will need to retrieve username from URL, or state passed from previous page(?)

  useEffect(() => {
    // Use username
    // GET connections
    // axios.get('/connections')
    // .then((response) => {
    // setPendingConnections(response.data.pendingConnections)
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
      <div className="notifications-container">
        {dummyData.dummyData.pendingConnections.map((connection) => (
          <NotificationsListItem key={connection.user_id} name={connection.name} bio={connection.bio} country={connection.country} />
        ))}
      </div>
    </>
  )
}

export default Notifications;
