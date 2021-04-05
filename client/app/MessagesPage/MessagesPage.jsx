import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewMessageInput from './NewMessageInput/NewMessageInput.jsx';
import MessagesList from './MessagesList/MessagesList.jsx';
import './MessagesPage.css';
import PalsList from './PalsList/PalsList.jsx'

const MessagesPage = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [tracker, setTracker] = useState(0)
  const [roomID, setRoomID] = useState(0)

  // useEffect((
  //   axios.get(`/roomMessages/${roomID}`)
  //     .then((res) => {
  //       setAllMessages(res.messages)
  //     })
  // ),[])

  const handleAddMessage = (msg) => {
    const element = document.querySelector('#new-message-input');
    element.value = '';
    const prevState = allMessages;
    prevState.push({
      senderID:'42069',
      body: msg,
      timestamp: 'date'
    });
    setAllMessages(prevState);
    setTracker(tracker + 1)
  }

  return (
    <div id="messages-page-grid" >
      <div id="messages-page-left" >
        <MessagesList allMessages={allMessages} />
        <NewMessageInput tracker={tracker} handleAddMessage={handleAddMessage} />
      </div>
    </div>
  );
};

export default MessagesPage;


