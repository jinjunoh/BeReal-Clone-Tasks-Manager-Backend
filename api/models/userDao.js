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
const getUserByEmail = async (email) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT
        id, 
        email,
        password,
        firstname,
        lastname,
        phone_number
      FROM users
      WHERE email = ? 
        `,
      [email]
    );
    return user;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};
const isExistedUser = async (email) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM users 
          WHERE email = ?
      ) idExists
      `,
      [email]
    );
    return !!parseInt(result.idExists);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT 
      id, 
        id, 
        email,
        password,
        firstname,
        lastname,
        phone_number
        FROM users
        WHERE id = ? 
        `,
      [id]
    );
    return user;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};


module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  isExistedUser
};
