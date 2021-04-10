const mongoose = require('mongoose');
// const { DB_IP } = require('../config.js');
mongoose.connect(
  // `mongodb+srv://${DB_IP}/blueocean`,
  `mongodb+srv://${process.env.DB_IP}/blueocean`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      authSource: 'admin'
    }
  })
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.log('connection fails'));

module.exports = mongoose;
