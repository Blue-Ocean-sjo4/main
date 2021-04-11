const { User, Room, Test } = require('./schema.js');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { Types } = require('mongoose');

/*
*-----------------------------------------------------------*
|            Create a new user with /signup                 |
*-----------------------------------------------------------*
*/

module.exports.signup = async (request, response) => {
  const username = request.body.username.toLowerCase();
  const { password, email, country, birthdate } = request.body;
  const birthDate = new Date(moment(birthdate));

  try {
    const doesExist = await User.exists({ username });

    if (doesExist) {
      response.sendStatus(409);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashPassword, email, country, birthdate: birthDate });
      response.send('registered');
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(404);
  }
};

module.exports.login = (username) => User.findOne({ username: username.toLowerCase() });

module.exports.findID = (id) => User.findById({ _id: id });

/*
*-----------------------------------------------------------*
|              Find the User and send User Data             |
*-----------------------------------------------------------*
*/
module.exports.findUserData = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ username: req.query.username.toLowerCase() })
      .select({ password: 0 })
      .lean();
    const rooms = Object.entries(loggedInUser.rooms);
    let roomsPayload = [];
    let pendingConnectionsPayload = [];

    const promisesRooms = rooms.map(room => User.findOne({ _id: room[1] })
      .lean()
      .then(connection => {
        return {
            roomID: room[0],
            userID: connection._id,
            name: connection.username,
            bio: connection.bio,
            country: connection.country,
            birthdate: connection.birthdate,
            profilePicture: connection.profilePicture,
            pronouns: connection.pronouns
          };
      })
    );

    const pendingConnections = Object.entries(loggedInUser.pendingConnections);
    const promisesPendingConnections = [];
    pendingConnections.forEach(pendingConnection => {

      if (!pendingConnection[1]) {
        promisesPendingConnections.push(User.findOne({ _id: pendingConnection[0] })
          .lean()
          .then(connection => {
            return {
              userID: connection._id,
              name: connection.username,
              bio: connection.bio,
              country: connection.country,
              birthdate: connection.birthdate,
              profilePicture: connection.profilePicture,
              pronouns: connection.pronouns
            };
          }));
      }
    });

    Promise.all(promisesRooms).then(roomsPayload => {
      Promise.all(promisesPendingConnections).then(pendingConnectionsPayload => {
        loggedInUser.pendingConnections = pendingConnectionsPayload;
        loggedInUser.rooms = roomsPayload;

        loggedInUser.userID = loggedInUser._id;
        delete loggedInUser._id;

        res.send(loggedInUser);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  };
};

/*
*-----------------------------------------------------------*
|                    Update User Data                       |
*-----------------------------------------------------------*
*/

module.exports.updateUserData = async (request, response) => {
  const { user_id, gender, pronouns, country, bio, profilePicture} = request.body;

  try {
    const update = {
      gender,
      pronouns,
      country,
      bio,
      profilePicture
    };

    const userData = await User.findOneAndUpdate({ _id: user_id }, update, { new: true })
      .select({ password: 0 });
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

module.exports.getMessages = async (request, response) => {
  const { room_id } = request.params;

  try {
    const roomData = await Room.findOne({ _id: room_id }).lean();
    delete roomData._id;
    response.send(roomData);
  } catch (error) {
    response.status(404).send(error);
  }
};

module.exports.findPal = async (request, response) => {
  try {
    const { user_id, country } = request.params;
    const userData = await User.findOne({ _id: user_id });
    const ineligiblePals = [Types.ObjectId(user_id)];

    Object.keys(userData.pendingConnections).forEach(user => ineligiblePals.push(Types.ObjectId(user)));
    Object.keys(userData.requestedConnections).forEach(user => ineligiblePals.push(Types.ObjectId(user)));

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
    // what if there are no available pals to connect with given the criteria?

    if (!randomPal[0]) {
      response.sendStatus(404);
    } else {
      randomPal[0].pendingConnections[user_id] = 0;
      await User.findOneAndUpdate({ _id: randomPal[0]._id }, { pendingConnections: randomPal[0].pendingConnections });

      userData.requestedConnections[randomPal[0]._id] = 0;
      userData.markModified('requestedConnections');
      await userData.save();

      response.sendStatus(200);
    }
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

    const userData = await User.findOne({ _id: user_id });
    userData.pendingConnections[user_pal_id] = 1;
    userData.rooms[newRoomId] = user_pal_id;
    userData.markModified('pendingConnections');
    userData.markModified('rooms');
    await userData.save();

    // add the room_id to palId's rooms with userId
    const palData = await User.findOne({ _id: user_pal_id });
    palData.requestedConnections[user_id] = 1;
    palData.rooms[newRoomId] = user_id;
    palData.markModified('requestedConnections');
    palData.markModified('rooms');
    await palData.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

module.exports.rejectPal = async (req, res) => {
  const { user_id, user_pal_id} = req.params;
  try {
    const userData = await User.findOne({ _id: user_id });
    userData.pendingConnections[user_pal_id] = 2;
    userData.markModified('pendingConnections');
    await userData.save();

    const palData = await User.findOne({ _id: user_pal_id });
    palData.requestedConnections[user_id] = 2;
    palData.markModified('requestedConnections');
    await palData.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

module.exports.saveMessages = async (roomID, message, senderID, media) => {
  try {
    let messageObj = {
      senderID: senderID,
      body: message,
      timestamp: new Date(),
      media
    };

    await Room.update({ _id: roomID }, { $push: { messages: messageObj } });

  } catch (error) {
    console.error(error);
  }
};

module.exports.removePal = async (req, res) => {
  const { user_id, user_pal_id, room_id} = req.params;

  try {
    await Room.deleteOne({ _id: room_id });
    const userData = await User.findOne({ _id: user_id });
    const palData = await User.findOne({ _id: user_pal_id });
    delete userData.rooms[room_id];
    delete palData.rooms[room_id];
    userData.markModified('rooms');
    palData.markModified('rooms');

    if (userData.pendingConnections[user_pal_id]) {
      userData.pendingConnections[user_pal_id] = 3;
      palData.requestedConnections[user_id] = 3;
      userData.markModified('pendingConnections');
      palData.markModified('requestedConnections');
    } else {
      userData.requestedConnections[user_pal_id] = 3;
      palData.pendingConnections[user_id] = 3;
      userData.markModified('requestedConnections');
      palData.markModified('pendingConnections');
    }
    await userData.save();
    await palData.save();

    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
};
