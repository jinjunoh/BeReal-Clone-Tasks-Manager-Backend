// handles the logic of user functions

// hashing passwords through bcrypt
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const userDao = require('../models/userDao');
// const {
//   pwValidationCheck,
//   emailValidationCheck,
// } = require('../utils/validation-check.js');

const signUp = async (email, password, firstname, lastname, phone_number) => {
  //   pwValidationCheck(password);
  //   emailValidationCheck(email);

  //   if (await isExistedUser(email)) {
  //     const error = new Error('EMAIL_EXISTS');
  //     error.statusCode = 400;
  //     throw error;
  //   }

  //   const saltRounds = 10;

  //   const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    email,
    password,
    firstname,
    lastname,
    phone_number
  );

  return createUser;
};

module.exports = {
  signUp,
};
