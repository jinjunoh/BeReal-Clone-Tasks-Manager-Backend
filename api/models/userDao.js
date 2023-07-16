// Manipulation of the database for user functions
const { dataSource } = require('./dataSource');

const createUser = async (
  email,
  password,
  firstname,
  lastname,
  phone_number
) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO users (
            email,
            password,
            firstname,
            lastname,
            phone_number
        ) VALUES (
          ?, ?, ?, ?, ?
        )
      `,
      [email, password, firstname, lastname, phone_number]
    );
  } catch (error) {
    console.log(error);
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
};
