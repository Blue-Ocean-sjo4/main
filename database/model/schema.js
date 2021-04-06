const mongoose = require('../index.js');

const roomSchema = mongoose.Schema({
  userOneID: String,
  userTwoID: String,
  messages: Array // array of objects with senderID, body, timestamp
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  // profile picture
  email: String,
  bio: String,
  country: String,
  gender: String,
  pronouns: String,
  birthdate: Date,
  pendingConnections: Object, // object of userIds as keys and 0, 1, or 2 as value
  rooms: Object // object of roomIds and value as userID of connection
});

module.exports.Room = mongoose.model('Room', roomSchema);
module.exports.User = mongoose.model('User', userSchema);