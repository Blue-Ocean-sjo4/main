import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import NotificationsListItem from './NotificationsListItem/NotificationsListItem.jsx';
import './Notifications.css'

const Notifications = ({ userID, loggedIn, setLoggedIn, pendingConnections }) => {

  // Will need to retrieve username from URL, or state passed from previous page(?)

  useEffect(() => {
    // Use username
    // GET connections
    // axios.get('/connections')
    // .then((response) => {
    // setPendingConnections(response.data.pendingConnections)
    // })
    // .catch((err) => {console.log(`err`, err)})
  }, [pendingConnections])

  if (!loggedIn) {
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <>
      <NavBar />
      <div className="notifications-container">
        {pendingConnections.map((connection, i) => (
          <NotificationsListItem key={i} userID={userID} palID={connection.userID} name={connection.name} bio={connection.bio} country={connection.country} pic={connection.profilePicture} />
        ))}
      </div>
    </>
  )
}

export default Notifications;
