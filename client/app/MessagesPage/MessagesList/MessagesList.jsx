import React, { useState, useEffect } from 'react';
import Message from './Message/Message.jsx';
import './MessagesList.css';

const MessagesList = ({ allMessages = [], myID = 'defaultID' }) => {

  return (
    <div id="messages-list-container" >
      {allMessages.map((message, i) => (
        <Message key={i} message={message} myID={myID} />
      ))}
    </div>
  );
};

export default MessagesList;