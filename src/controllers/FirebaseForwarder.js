const FirebaseService = require("../services/Firebase");

// Utils
const getFirebaseStatusCode = require("../utils/getFirebaseStatusCode");

// Enums
const httpStatusCodes = require("../common/enums/httpStatusCodes");
class FirebaseForwarder {
  async signUpWithEmail(request, response) {
    const { email, password } = request.body;

    const responsePayload = {
      status: httpStatusCodes.CREATED,
      data: {},
    };

    try {
      const user = await FirebaseService.signUpWithEmail(email, password);

      await FirebaseService.initializeUserDb(user);

      responsePayload.data = { user };
    } catch (error) {
      responsePayload.status = getFirebaseStatusCode(error.code);
      responsePayload.data = { code: error.code, message: error.message };
    } finally {
      return response.status(responsePayload.status).json(responsePayload);
    }
  }

  async signInWithEmail(request, response) {
    const { email, password } = request.body;

    const responsePayload = {
      status: httpStatusCodes.SUCCESS,
      data: {},
    };

    try {
      const user = await FirebaseService.signInWithEmail(email, password);

      responsePayload.data = { user };
    } catch (error) {
      responsePayload.status = getFirebaseStatusCode(error.code);
      responsePayload.data = { code: error.code, message: error.message };
    } finally {
      return response.status(responsePayload.status).json(responsePayload);
    }
  }

  async resetEmailPassword(request, response) {
    const { email } = request.body;

    const responsePayload = {
      status: httpStatusCodes.SUCCESS,
      data: {},
    };

    try {
      await FirebaseService.resetEmailPassword(email);
    } catch (error) {
      responsePayload.status = getFirebaseStatusCode(error.code);
      responsePayload.data = { code: error.code, message: error.message };
    } finally {
      return response.status(responsePayload.status).json(responsePayload);
    }
  }
}

module.exports = FirebaseForwarder;
