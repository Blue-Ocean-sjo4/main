import React, { useState } from 'react';
import './NewMessageInput.css';

const NewMessageInput = ({ handleAddMessage }) => {
  const [currentMessageText, setCurrentMessageText] = useState('');

  return (
    <form id="new-message-form" >
      <input
        type='text'
        id='new-message-input'
        onChange={(e) => setCurrentMessageText(e.target.value)}
      >
      </input>
      <button
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          if (currentMessageText.length) {
            handleAddMessage(currentMessageText);
            setCurrentMessageText('');
          }
        }
        } >{'>'}</button>
    </form>
  );
};

export default NewMessageInput;