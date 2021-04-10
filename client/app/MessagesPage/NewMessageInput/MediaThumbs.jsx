import React from 'react';

function MediaThumbs({ currentMessageMedia }) {
  return (
    currentMessageMedia.map((media) => {
      if (media.mimetype.split('/')[0] === 'image') {
        return (<img key={media.filename} className="message-media-item-thumb" src={media.url}></img>)
      } else if (media.mimetype.split('/')[0] === 'audio') {
        return (<img key={media.filename} className="message-media-item-thumb" src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Icon_sound_loudspeaker.svg"></img>)
      } else {
        return (<img key={media.filename} className="message-media-item-thumb" src="https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png"></img>)
      }
    })
  )
}

export default MediaThumbs;