const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const signUp = catchAsync(async (req, res) => {
  const {
    email,
    password,
    name,
    phoneNumber,
    address,
    gender,
    birthDate,
    points = parseFloat(process.env.POINTS) || 500000.0,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !phoneNumber ||
    !address ||
    !gender ||
    !birthDate
  ) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(
    email,
    password,
    name,
    phoneNumber,
    address,
    gender,
    birthDate,
    points
  );

  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
});