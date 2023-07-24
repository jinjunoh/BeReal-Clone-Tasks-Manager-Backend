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
const tasks = async (user_id) => {
  try {
    return await dataSource.query(
      `
        SELECT
        id, 
        title,
        body,
        due_date,
        status
      FROM todo
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
};
const edit = async (id, user_id, title, body, due_date, status) => {
  try {
    return await dataSource.query(
      `
        UPDATE todo 
            SET title = ?
            SET body = ?
            SET due_date = ?
            SET status = ?
            WHERE id = ? AND user_id = ?
        ) VALUES (
          ?, ?, ?, ?, ?, ?
        )
      `,
      [title, body, due_date, status, id, user_id]
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
  tasks,
    edit,
};
