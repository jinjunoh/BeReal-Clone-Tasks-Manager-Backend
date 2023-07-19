// Manipulation of the database for user functions
const { dataSource } = require('./dataSource');

const create = async (user_id, title, body, due_date, status) => {
    try {
      console.log(user_id, title, body, due_date, status);
    return await dataSource.query(
      `
        INSERT INTO todo (
            user_id,
            title,
            body,
            due_date,
            status
        ) VALUES (
          ?, ?, ?, ?, ?
        )
      `,
      [user_id, title, body, due_date, status]
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
};
