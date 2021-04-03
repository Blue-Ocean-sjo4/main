// Requirements
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(__dirname + '/../client/dist'))

// Routing



// Listener
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});