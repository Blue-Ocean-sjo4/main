import React from 'react';
import { PickerOverlay } from 'filestack-react';
const client = require('filestack-js').init('AQQ2HsldSOyLTodfUruTTz');

function FilePicker() {

  return (
    <PickerOverlay
      apikey={'AQQ2HsldSOyLTodfUruTTz'}
      onSuccess={(res) => console.log('res: ', res)}
    />
  )
}

export default FilePicker