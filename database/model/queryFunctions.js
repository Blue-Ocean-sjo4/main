const { User, Room } = require('./schema.js');
const bcrypt = require('bcrypt');

module.exports.signup = async (request, response) => {
  console.log('request body:', request.body);
  const { username, password, email, country, birthdate } = request.body;
  try {
    const doesExist = await User.exists({ username });

    if (doesExist) {
      response.sendStatus(409);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashPassword, email, country, birthdate });
      // response.redirect('/login');
      response.send('registered');
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(404);
  }
};

module.exports.login = (username) => User.findOne({ username });

module.exports.findID = (id) => User.findById({ _id: id });

module.exports.findUserData = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ _id: req.body.id });
    const rooms = Object.entries(loggedInUser.rooms);
    const roomsPayload = rooms.map(async (room) => {
      const connection = await User.findOne({ _id: room[1] });
      return {
        roomId: room[0],
        user_id: connection._id,
        name: connection.name,
        bio: connection.bio,
        country: connection.country,
        birthdate: connection.birthdate
      };
    });

    const pendingConnections = Object.entries(loggedInUser.pendingConnections);
    const pendingConnectionsPayload = pendingConnections.map(async (pendingConnection) => {
      const connection = await User.findOne({ _id: pendingConnection[0] });
      return {
        user_id: connection._id,
        name: connection.name,
        bio: connection.bio,
        country: connection.country,
        birthdate: connection.birthdate
      };
    });

    loggedInUser.pendingConnections = pendingConnectionsPayload;
    loggedInUser.rooms = roomsPayload;

    res.send(loggedInUser);
  } catch (error) {
    res.status(404).send(error);
    console.error(error);
  };
};

module.exports.updateUserData = (request, response) => {

};

//const hashPassword = await bcrypt.hash(<password>, 10);





// User.findOne({ _id: id })
// .then(userData => {
//   var rooms = Object.entries(userData.rooms);
//   var promiseArray = rooms.map((room) => {
//     return User.findOne({ _id: room[1] })
//   })

//   Promise.all(promiseArray)
//     .then((connections) => {

//       res.send({
//         ...userData, rooms
//       })
//     })
//   //res.status(200).send(result.data)
// };
// .catch(err => res.status(404).send('user does not exist'));
