// Manipulation of the database for user functions
const { dataSource } = require('./dataSource');

const create = async (user_id, title, body, due_date, status) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO users (
            user_id,
            title,
            body,
            due_date,
            status,
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
