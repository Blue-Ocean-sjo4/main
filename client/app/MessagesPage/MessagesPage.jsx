import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessagesPageBanner from './MessagesPageBanner/MessagesPageBanner.jsx';
import MessagesList from './MessagesList/MessagesList.jsx';
import NewMessageInput from './NewMessageInput/NewMessageInput.jsx';
import PalsList from './PalsList/PalsList.jsx'
import './MessagesPage.css';

/*

message object:
{
  senderID: String,
  body: String,
  timestamp: String
  media: Array
}

*/

const MessagesPage = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [tracker, setTracker] = useState(0)
  const [roomID, setRoomID] = useState(0)
  const [palsList, setPalsList] = useState([{ pic: 'https://posterspy.com/wp-content/uploads/2019/05/TheDude_lr.jpg', name: 'the dude', country: 'US', bio: 'thats just like your opinion man' }, { pic: 'https://i.pinimg.com/originals/05/17/bf/0517bfa5e9d45208761756e1b0c1f5f9.jpg', name: 'the dude again', country: 'US', bio: 'not on the carpet, come on' }, { pic: 'https://wondersinthedark.files.wordpress.com/2012/09/the-big-lebowski-1.jpg', name: 'El Duderino', country: 'IL', bio: 'that\'s, like, your bio man.' }])
  const [currentPal, setCurrentPal] = useState({ pic: 'https://wondersinthedark.files.wordpress.com/2012/09/the-big-lebowski-1.jpg', name: 'El Duderino', country: 'IL', bio: 'that\'s, like, your bio man.' })

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
      senderID: '42069',
      body: msg,
      timestamp: 'date'
    });
    setAllMessages(prevState);
    setTracker(tracker + 1);
    // const messagesList = document.querySelector('#messages-list-container');
    // messagesList.scrollTo(0, messagesList.scrollHeight);
  }

  return (
    <div id="messages-page-grid" >
      <div id="messages-page-left" >
        <MessagesPageBanner name={currentPal.name} bio={currentPal.bio} profilePic={currentPal.pic} />
        <MessagesList currentPal={currentPal} allMessages={allMessages} />
        <NewMessageInput tracker={tracker} handleAddMessage={handleAddMessage} />
      </div>
      <div id="messages-page-right">
        <div id="pals-list-title">Pals List</div>
        <PalsList currentPal={currentPal} setCurrentPal={setCurrentPal} palsList={palsList} />
      </div>
    </div>
  );
};

export default MessagesPage;


