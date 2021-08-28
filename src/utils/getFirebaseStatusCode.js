// Enums
const httpStatusCodes = require("../common/enums/httpStatusCodes");
const firebaseStatusCodes = require("../common/enums/firebaseStatusCodes");

function getFirebaseStatusCode(errorCode) {
  const status = firebaseStatusCodes[errorCode]?.statusCode;

  return status ? status : httpStatusCodes.INTERNAL_SERVER_ERROR;
}

module.exports = getFirebaseStatusCode;
