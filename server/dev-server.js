// Requirements
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Middleware
app.use(express.static(__dirname + '/../client/dist'))

// Routing

// React router base
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// Listener
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});