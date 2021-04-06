const { User, Room } = require('./schema.js');
const bcrypt = require('bcrypt');

/*
*-----------------------------------------------------------*
|                                                           |
|            Create a new user with /signup                 |
|                                                           |
*-----------------------------------------------------------*
*/

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

module.exports.signup = async (request, response) => {
  console.log('request body:', request.body);
  const { username, password, email, country, birthdate } = request.body;
  const birthDate = new Date(birthdate.subString(0,3), birthdate.subString(5,6), birthdate.subString(8,9));
  try {
    const doesExist = await User.exists({ username });

    if (doesExist) {
      response.sendStatus(409);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashPassword, email, country, birthdate: birthDate });
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

/*
*-----------------------------------------------------------*
|                                                           |
|              Find the User and send User Data             |
|                                                           |
*-----------------------------------------------------------*
*/
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

/*
*-----------------------------------------------------------*
|                                                           |
|                    Update User Data                       |
|                                                           |
*-----------------------------------------------------------*
*/

module.exports.updateUserData = async (request, response) => {
  const { user_id, username, gender, pronoun, country, bio } = request.body;

  try {
    const update = {
      gender,
      pronoun,
      country,
      bio
    };

    const userData = await User.findOneAndUpdate({ _id: user_id }, update, { new: true });
    response.status(201).send(userData);
  } catch(error) {
    response.status(404).send(error);
  }
};

/*
*-----------------------------------------------------------*
|                                                           |
|                    Get Room messages                      |
|                                                           |
*-----------------------------------------------------------*
*/

/*
const roomSchema = mongoose.Schema({
  userOneID: String,
  userTwoID: String,
  messages: Array
});
*/
module.exports.getMessages = async (request, response) => {
  const { room_id } = request.params;

  try {
    response.send(await Room.findOne({ _id: room_id }));
  } catch (error) {
    response.status(404).send(error);
  }
};

module.exports.postMessage = async (request, response) => {
  const { room_id } = request.params;

  try {
    const room = await Room.findOne({ _id: room_id });
    if (room.room_id) {
      // waiting for socket implementation
      room.messages.push();
    }
  } catch (error) {
    response.status(404).send(error);
  }
};

module.exports.findPal = async (request, response) => {
  const { user_id, country, birthdate } = request.query;
  // find user by user_id
  const userData = await User.findOne({ _id: user_id });
  const ineligiblePals = [];
  // loop through pending;
  Object.keys(userData.pendingConnections).forEach(user => ineligiblePals.push(user));
  // loop through accepted;
  Object.values(userData.rooms).forEach(user => ineligiblePals.push(user));
  // user is requesting someone to be a pal
  // requestedConnections


  //18
  // const bdayCriteria
  // { $gte: value }
  // <18
  // { $lt: value }
  // TODO: implement milisecond filter for age group

  const possiblePals = await User.find({ _id: { $nin: ineligiblePals }, country: country, birthdate: bdayCriteria })
  // const getPhotos = (reviewIds) => ReviewsPhotos.find({ review_id: { $in: reviewIds } })
};
// db.movies.update({'seasons.episodes.videos._id': data._id}, {$push: {'seasons.0.episodes.0.videos.$.reports': data.details}})

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
