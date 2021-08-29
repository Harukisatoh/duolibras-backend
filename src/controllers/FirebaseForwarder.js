const FirebaseService = require("../services/Firebase");

// Utils
const getFirebaseStatusCode = require("../utils/getFirebaseStatusCode");

// Enums
const httpStatusCodes = require("../common/enums/httpStatusCodes");
class FirebaseForwarder {
  async authWithFacebook(request, response) {
    const { token } = request.body;

    const responsePayload = {
      status: httpStatusCodes.SUCCESS,
      data: {},
    };

    try {
      const user = await FirebaseService.authWithFacebook(token);

      // Checks if it's the first time user has logged in
      const isUserDbCreated =
        await FirebaseService.checkIfUserDbIsAlreadyCreate(user);

      // If it's the first time, it should initialize user db
      if (!isUserDbCreated) {
        await FirebaseService.initializeUserDb(user);
      }

      responsePayload.data = { user };
    } catch (error) {
      responsePayload.status = httpStatusCodes.INTERNAL_SERVER_ERROR;
      responsePayload.data = error;
    } finally {
      return response.status(responsePayload.status).json(responsePayload);
    }
  }

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
