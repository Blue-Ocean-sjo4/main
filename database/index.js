const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/testBO', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://52.53.161.12/testBO', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.log('connection fails'));

module.exports = mongoose;
