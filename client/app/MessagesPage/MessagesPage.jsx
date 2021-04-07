import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import MessagesPageBanner from './MessagesPageBanner/MessagesPageBanner.jsx';
import MessagesList from './MessagesList/MessagesList.jsx';
import NewMessageInput from './NewMessageInput/NewMessageInput.jsx';
import PalsList from './PalsList/PalsList.jsx'
import './MessagesPage.css';

let socketID = '';
const socket = io('http://localhost:1337', { autoConnect: false });
const testRooms = ['room1', 'room2'];
const myRoom = testRooms[Math.floor(Math.random() * testRooms.length)];

/*

message object:
{
  senderID: String,
  body: String,
  timestamp: String
  media: Array
}

*/

const MessagesPage = ({ loggedIn, setLoggedIn, rooms, currentRoom }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [tracker, setTracker] = useState(0)
  const [roomID, setRoomID] = useState(0)
  const [palsList, setPalsList] = useState([{ pic: 'https://posterspy.com/wp-content/uploads/2019/05/TheDude_lr.jpg', name: 'the dude', country: 'US', bio: 'thats just like your opinion man' }, { pic: 'https://i.pinimg.com/originals/05/17/bf/0517bfa5e9d45208761756e1b0c1f5f9.jpg', name: 'the dude again', country: 'US', bio: 'not on the carpet, come on' }, { pic: 'https://wondersinthedark.files.wordpress.com/2012/09/the-big-lebowski-1.jpg', name: 'El Duderino', country: 'IL', bio: 'that\'s, like, your bio man.' }])
  const [currentPal, setCurrentPal] = useState({ pic: 'https://wondersinthedark.files.wordpress.com/2012/09/the-big-lebowski-1.jpg', name: 'El Duderino', country: 'IL', bio: 'that\'s, like, your bio man.' })

  useEffect(() => {
    const { pic, name, country, bio } = currentRoom.room;
    setCurrentPal({ pic, name, country, bio })
  }, []);

  useEffect(() => {
    const messagesList = document.querySelector('#messages-list-container');
    messagesList.scrollTo(0, messagesList.scrollHeight);
  }, [allMessages.length]);

  useEffect(() => {
    socket.on('receive new message', ({ msg, otherSocketID }) => {
      console.log('I received this message:', msg);
      console.log('Sender\'s SocketID:', otherSocketID);
      setAllMessages(prevState => [...prevState, {senderID: otherSocketID, body: msg, timestamp: 'date'}]);
      setTracker(tracker + 1);
    });

    socket.auth = {
      room: myRoom,
      username: 'wilson'
    };
    socket.connect();

    // watch for change currentPal.name, ideally currnetPal.id
    // TODO add a clean up function to disconnect from the current pal/room before entering a chat with the new pal
    //socket.emit('forceDisconnect');
    return () => socket.disconnect();
  },[currentPal.name]);

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
      senderID: socketID,
      body: msg,
      timestamp: 'date'
    });
    setAllMessages(prevState);
    setTracker(tracker + 1);
    socket.emit('send new message', { msg, room: myRoom });
  }

  if (!loggedIn) {
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <div id="messages-page-grid" >
      <div id="messages-page-left" >
        <MessagesPageBanner name={currentPal.name} bio={currentPal.bio} profilePic={currentPal.pic} />
        <MessagesList currentPal={currentPal} allMessages={allMessages} myID={socketID} />
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


