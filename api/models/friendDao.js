const { dataSource } = require('./dataSource');
const getFriends = async (user_id) => {
  try {
    return await dataSource.query(
      `
        SELECT
        id, 
        friend_user_id
      FROM friend
      WHERE user_id = ? 
        `,
      [user_id]
    );
  } catch (error) {
    console.log(error);
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
}
const isExistedUser = async (friend_user_id) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM friend 
          WHERE friend_user_id = ? 
      ) friendExists
      `,
      [friend_user_id]
    );
    return !!parseInt(result.friendExists);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};
const create = async (
  user_id,
  friend_user_id
) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO friend (
            user_id,
            friend_user_id
        ) VALUES (
          ?, ?
        )
      `,
      [user_id, friend_user_id]
    );
  } catch (error) {
    console.log(error);
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  create,
  isExistedUser,
  getFriends,
};