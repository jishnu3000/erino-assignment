require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const USERS_MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_USERS_MONGODB_URI
    : process.env.USERS_MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
  USERS_MONGODB_URI,
};
