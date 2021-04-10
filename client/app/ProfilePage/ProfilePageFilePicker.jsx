import React from 'react'
import { PickerOverlay } from 'filestack-react';
// import { TOKEN } from '../../../filepickerConfig.js';
const client = require('filestack-js').init(process.env.FILESTACK_TOKEN);

const ProfilePageFilePicker = ({ profilePicture, setProfilePicture }) => {
  // TODO add profile page state here (profilePic and SetProfilePic)
  return (
    <PickerOverlay
      apikey={process.env.FILESTACK_TOKEN}
      onSuccess={
        (res) => {
          console.log('res: ', res)
          setProfilePicture(res.filesUploaded[0].url)
        }
      }
    />
  )
}

export default ProfilePageFilePicker
