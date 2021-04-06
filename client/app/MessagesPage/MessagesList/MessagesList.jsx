import React, { useState, useEffect } from 'react';
import Message from './Message/Message.jsx';
import './MessagesList.css';

const MessagesList = ({ allMessages = [] }) => {

  return (
    <div id="messages-list-container" >
      {allMessages.map((message, i) => (
        <Message key={i} message={message}/>
      ))}
    </div>
  );
};

export default MessagesList;