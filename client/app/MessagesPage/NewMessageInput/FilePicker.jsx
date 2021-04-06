import React from 'react';
import { PickerOverlay } from 'filestack-react';
import TOKEN from '../../../../filepickerConfig.js';
const client = require('filestack-js').init(TOKEN);

function FilePicker() {

  return (
    <PickerOverlay
      apikey={TOKEN}
      onSuccess={(res) => console.log('res: ', res)}
    />
  )
}

export default FilePicker