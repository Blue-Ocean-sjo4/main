import React from 'react';
import { PickerOverlay } from 'filestack-react';
// import { TOKEN } from '../../../../filepickerConfig.js';
const client = require('filestack-js').init(process.env.TOKEN);

function FilePicker({ setCurrentMessageMedia, currentMessageMedia }) {

  return (
    <PickerOverlay
      apikey={process.env.TOKEN}
      onSuccess={
        (res) => {
          console.log('res: ', res)
          var newMedia = currentMessageMedia;
          newMedia.push({ filename: res.filesUploaded[0].filename, mimetype: res.filesUploaded[0].mimetype, url: res.filesUploaded[0].url });
          setCurrentMessageMedia(newMedia)
        }
      }
    />
  )
}

export default FilePicker