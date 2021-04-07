const { User, Room, Test } = require('./schema.js');
const bcrypt = require('bcrypt');
const moment = require('moment');

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
  console.log(birthdate);
  const birthDate = new Date(moment(birthdate));

  // const birthDate = new Date(birthdate.subString(0,3), birthdate.subString(5,6), birthdate.subString(8,9));
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
    const loggedInUser = await User.findOne({ username: req.query.username });
    const rooms = Object.entries(loggedInUser.rooms);
    const roomsPayload = rooms.map(async (room) => {
      const connection = await User.findOne({ _id: room[1] });
      return {
        roomID: room[0],
        userID: connection._id,
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
        userID: connection._id,
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

// TODO: updated schema to include requestedConnections
module.exports.findPal = async (request, response) => {
  try {
    const { user_id, country } = request.params;
    const userData = await User.findOne({ _id: user_id });
    const ineligiblePals = [user_id];
    // loop through pending;
    Object.keys(userData.pendingConnections).forEach(user => ineligiblePals.push(user));
    // loop through accepted;
    Object.values(userData.rooms).forEach(user => ineligiblePals.push(user));
    // user is requesting someone to be a pal
    // requestedConnections
    const userBirthDate = userData.birthdate;
    const legalAge = new Date(moment().subtract(18, 'years'));

    let bdayCriteria = moment(userBirthDate) >= legalAge ? { $gte: legalAge } : { $lt: legalAge };

    const randomPal = await User.aggregate([
      {
        $match: {
          _id: { $nin: ineligiblePals },
          country: country,
          birthdate: bdayCriteria
        },
      },
      {
        $sample: { size: 1 }
      }
    ]);


    const updatedPendingConnections = randomPal[0].pendingConnections;
    updatedPendingConnections[user_id] = 0;

    const newPal = await User.findOneAndUpdate({ _id: randomPal[0]._id }, {pendingConnections: updatedPendingConnections });

    response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
};

module.exports.acceptPal = async (req, res) => {
  const { user_id, user_pal_id} = req.params;

  try {
    // create a room for userId and palID
    const newRoom = await Room.create({ userOneID: user_id, userTwoID: user_pal_id });
    const newRoomId = newRoom._id;
    console.log(newRoomId);
    // remove palId from userId's pending connections
    const userData = User.findOne({ _id: user_id });
    // add the room_id to userId's rooms with palId

    // add the room_id to palId's rooms with userId

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

// module.exports.test = async (req, res) => {
//   await Test.create({ testDate: moment() });
//   const results = await Test.find({});
//   const testDate = results[0].testDate;
//   console.log(new Date(moment('1991-04-05')));
//   res.sendStatus(201);
// };
