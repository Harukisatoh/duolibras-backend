// Enums
const httpStatusCodes = require("./httpStatusCodes");

module.exports = {
  "auth/invalid-email": {
    statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
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
  "auth/email-already-in-use": {
    statusCode: httpStatusCodes.CONFLICT,
  },
  "auth/operation-not-allowed": {
    statusCode: httpStatusCodes.NOT_FOUND,
  },
  "auth/weak-password": {
    statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
  },
};
