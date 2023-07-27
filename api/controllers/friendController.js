// inputs/outputs of the information recived through RESTful API

const friendService = require('../services/friendService');
const { catchAsync } = require('../middlewares/error');
const get = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  if (!user_id) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }
  const friends = await friendService.get(user_id);
  return res.status(201).json({
    friends,
  });
});
const create = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  const {friend_user_id} = req.body;
  if (!friend_user_id || !user_id) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await friendService.create(user_id, friend_user_id);
    
  return res.status(201).json({
    message: 'CREATE_SUCCESS',
  });
});
module.exports = {
  create,
  get,
};
