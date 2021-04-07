import React from 'react';
import './Message.css';

const Message = ({ message = '', myID }) => {
  return (<div className={message.senderID === myID ? 'message-by-me' : 'message-by-pal'} >{message.body}</div>);
};

export default Message;