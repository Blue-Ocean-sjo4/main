import React from 'react';
import './Message.css';

const Message = ({ message, myID }) => {

  function openImage(e) {

  }

  function openOther() {

  }

  return (<div className={message.senderID === myID ? 'message-by-me' : 'message-by-pal'} >
    <div className="message-body">{message.body}</div>
    {
      message.media[0] ? <div className="message-media">
        {
          message.media.map((media, i) => {
            if (media.mimetype.split('/')[0] === 'image') {
              return (<img onClick={openImage} className="message-media-image" src={media.url}></img>)
            } else if (media.mimetype.split('/')[0] === 'audio') {
              return (<a target="_blank" href={media.url}><img className="message-media-image" src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Icon_sound_loudspeaker.svg"></img></a>)
            } else {
              return (<a target="_blank" href={media.url}><img className="message-media-image" src="https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png"></img></a>)
            }
          })
        }
      </div> : null
    }
  </div>);
};

export default Message;