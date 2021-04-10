import React, { useState, useEffect } from 'react';
import './NewMessageInput.css';
// import FilePicker from './FilePicker.jsx';

const NewMessageInput = ({ handleAddMessage }) => {
  const [currentMessageText, setCurrentMessageText] = useState('');
  const [currentMessageMedia, setCurrentMessageMedia] = useState([])
  const [showingFilePicker, showFilePicker] = useState(false);

  return (
    <div className="new-message-form-container">
      <div className="new-message-media">
        {
          currentMessageMedia[0] ?
            <MediaThumbs currentMessageMedia={currentMessageMedia} />
            : <div className="message-media-item-spacer"></div>
        }
      </div>
      <form id="new-message-form" >
        <input
          type='text'
          id='new-message-input'
          onChange={(e) => setCurrentMessageText(e.target.value)}
        >
        </input>
        <button
          type='submit'
          id="submit-new-message"
          onClick={(e) => {
            e.preventDefault();
            if (currentMessageText.length) {
              handleAddMessage(currentMessageText, currentMessageMedia);
              setCurrentMessageText('');
              setCurrentMessageMedia([]);
            }
          }
          }>
          <i className="fas fa-pen-nib" />
        </button>
        {/* {
          showingFilePicker ? <FilePicker setCurrentMessageMedia={setCurrentMessageMedia} currentMessageMedia={currentMessageMedia} /> : null
        }
        <button id="new-message-upload"
          onMouseEnter={() => { showFilePicker(false) }}
          onClick={(e) => { e.preventDefault(); showFilePicker(true) }}>
          <i className="fas fa-upload"></i>
        </button> */}
        {/* <button onClick={(e) => {
          e.preventDefault();
          var old = currentMessageMedia;
          old.push({ filename: '', mimetype: 'image/po', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png' })
          setCurrentMessageMedia(old)
        }}>add</button> */}
      </form>
    </div>
  );
};

export default NewMessageInput;