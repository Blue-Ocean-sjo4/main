import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import MessagesPageBanner from './MessagesPageBanner/MessagesPageBanner.jsx';
import MessagesList from './MessagesList/MessagesList.jsx';
import NewMessageInput from './NewMessageInput/NewMessageInput.jsx';
import PalsList from './PalsList/PalsList.jsx'
import './MessagesPage.css';

const socket = io('http://localhost:1337', { autoConnect: false });

/*

message object:
{
  senderID: String,
  body: String,
  timestamp: String
  media: Array
}

*/

const MessagesPage = ({ loggedIn, setLoggedIn, rooms = { room: { roomID: '' } }, currentRoom, userID }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [tracker, setTracker] = useState(0);
  const [roomID, setRoomID] = useState(currentRoom.room?.roomID);
  const [room, setRoom] = useState(currentRoom.room);
  const [palsList, setPalsList] = useState(
    rooms.map((room) => {
      return { pic: room?.profilePicture, name: room.name, pronouns: room.pronouns, country: room.country, bio: room.bio, roomID: room.roomID };
    })
  );
  const [currentPal, setCurrentPal] = useState({ pic: room?.profilePicture, name: room?.name, pronouns: room?.pronouns, country: room?.country, bio: room?.bio });

  useEffect(() => {
    axios.get(`http://localhost:1337/roomMessages/${roomID}`)
      .then((messages) => {
        setAllMessages(messages.data.messages);
      });
  }, [roomID]);

  useEffect(() => {
    const messagesList = document.querySelector('#messages-list-container');
    messagesList?.scrollTo(0, messagesList.scrollHeight);
  }, [allMessages.length]);

  useEffect(() => {
    if (roomID) {
      socket.auth = {
        room: roomID
      };
      socket.connect();

      socket.on('receive new message', ({ msg, senderID, media }) => {
        setAllMessages(prevState => [...prevState, { senderID, body: msg, timestamp: new Date(), media }]);
        setTracker(tracker + 1);
      });
    }

    return () => socket.disconnect();
  }, [roomID]);

  const handleAddMessage = (msg, media) => {
    const element = document.querySelector('#new-message-input');
    element.value = '';
    const prevState = allMessages;
    prevState.push({
      senderID: userID,
      body: msg,
      timestamp: new Date(),
      media
    });
    setAllMessages(prevState);
    setTracker(tracker + 1);
    socket.emit('send new message', { msg, room: roomID, senderID: userID, media });
  }

  if (!loggedIn) {
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <div id="messages-page-grid" >
      <div id="messages-page-left" >
        <MessagesPageBanner
          name={currentPal.name}
          pronouns={currentPal.pronouns}
          bio={currentPal.bio}
          profilePic={currentPal?.pic}
          userID={userID}
        />
        <MessagesList currentPal={currentPal} allMessages={allMessages} myID={userID} />
        <NewMessageInput tracker={tracker} handleAddMessage={handleAddMessage} />
      </div>
      <div id="messages-page-right">
        <div id="pals-list-title">Pals List</div>
        <PalsList setRoomID={setRoomID} currentPal={currentPal} setCurrentPal={setCurrentPal} palsList={palsList} />
      </div>
    </div>
  );
};

export default MessagesPage;


