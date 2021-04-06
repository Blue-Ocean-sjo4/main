import React from 'react';
import './Message.css';

const Message = ({ message = '' }) => {
  return (<div className="my-message" >{message.body}</div>);
};

export default Message;