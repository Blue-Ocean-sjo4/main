const mongoose = require('mongoose');
const { DB_IP } = require('../config.js');
// mongoose.connect('mongodb://localhost:27017/testBO', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(`mongodb://${DB_IP}/testBO`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.log('connection fails'));

module.exports = mongoose;
