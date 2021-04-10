import React, { useState, useEffect } from 'react';
import Message from './Message/Message.jsx';
import './MessagesList.css';

const MessagesList = ({ allMessages = [], myID = 'defaultID' }) => {

  const [showingImage, showImage] = useState(false);
  const [modalURL, setModalURL] = useState('');

  return (
    <div onClick={() => { if (showingImage) { showImage(false) } }} id="messages-list-container" >
      {allMessages.map((message, i) => (
        <Message showingImage={showingImage} showImage={showImage} setModalURL={setModalURL} key={i} message={message} myID={myID} />
      ))}
      {
        showingImage ? <div className="image-modal">
          <div className="image-modal-content">
            <img src={modalURL}></img>
          </div>
        </div> : null
      }
    </div>
  );
};

export default MessagesList;