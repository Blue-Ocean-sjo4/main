const { User, Room } = require('./schema.js');
const bcrypt = require('bcrypt');

module.exports.signup = async (response, request) => {
  const { username, password, email, country, birthdate } = request.body;
  try {
    const doesExist = await User.exists({ username });

    if (doesExist) {
      response.sendStatus(409);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({username, hashPassword, email, country, birthdate});
      response.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    response.sendStatus(404);
  }
};

//const hashPassword = await bcrypt.hash(<password>, 10);