// Enums
const httpStatusCodes = require("./httpStatusCodes");

module.exports = {
  "auth/invalid-email": {
    statusCode: httpStatusCodes.BAD_REQUEST,
  },
  "auth/user-not-found": {
    statusCode: httpStatusCodes.CONFLICT,
  },
  "auth/wrong-password": {
    statusCode: httpStatusCodes.UNAUTHORIZED,
  },
  "auth/user-disabled": {
    statusCode: httpStatusCodes.UNAUTHORIZED,
  },
};
