const FirebaseService = require("../services/Firebase");

// Utils
const getFirebaseStatusCode = require("../utils/getFirebaseStatusCode");

// Enums
const httpStatusCodes = require("../common/enums/httpStatusCodes");
class FirebaseForwarder {
  async loginWithEmailAndPassword(request, response) {
    const { email, password } = request.body;

    const responsePayload = {
      status: httpStatusCodes.SUCCESS,
      data: {},
    };

    try {
      const user = await FirebaseService.signInWithEmailAndPassword(
        email,
        password
      );

      responsePayload.data = { user };
    } catch (error) {
      responsePayload.status = getFirebaseStatusCode(error.code);
      responsePayload.data = { code: error.code, message: error.message };
    } finally {
      return response.status(responsePayload.status).json(responsePayload);
    }
  }

  async resetPassword(request, response) {
    const { email } = request.body;

    const responsePayload = {
      status: httpStatusCodes.SUCCESS,
      data: {},
    };

    try {
      await FirebaseService.resetPassword(email);
    } catch (error) {
      responsePayload.status = getFirebaseStatusCode(error.code);
      responsePayload.data = { code: error.code, message: error.message };
    } finally {
      return response.status(responsePayload.status).json(responsePayload);
    }
  }
}

module.exports = FirebaseForwarder;
