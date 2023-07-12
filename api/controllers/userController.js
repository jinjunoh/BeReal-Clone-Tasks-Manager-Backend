// inputs/outputs of the information recived through RESTful API

const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const signUp = catchAsync(async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    password
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !username ||
    !password 
  ) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(
    firstname,
    lastname,
    username,
    password
  );

  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
});

module.exports = {
  signUp,
};