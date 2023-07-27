// handles the logic of friend functions
const friendDao = require('../models/friendDao');
const create = async (user_id, friend_user_id) => {
    if (await isExistedFriend(friend_user_id)) {
      const error = new Error('FRIEND_EXISTS');
      error.statusCode = 400;
      throw error;
    } else {
        const createFriend = await friendDao.create(
          user_id, friend_user_id
        );
        return createFriend;
    }
};
const get = async (user_id) => {
    return friendDao.getFriends(user_id);
}
const isExistedFriend = async (friend_user_id) => {
  return friendDao.isExistedUser(friend_user_id);
};
const getFriendsById = async (id) => {
  return friendDao.getFriendById(id);
};

module.exports = {
  create,
  isExistedFriend,
  getFriendsById,
  get,
};
