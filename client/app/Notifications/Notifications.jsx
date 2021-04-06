import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import NotificationsListItem from './NotificationsListItem/NotificationsListItem.jsx';
import dummyData from '../../../dummyData.js';
import './Notifications.css'

const Notifications = () => {
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
