const Firebase = require("../integrations/firebase");

class FirebaseService {
  static timestamp = Firebase.database.ServerValue.TIMESTAMP;

  static async signInWithEmailAndPassword(email, password) {
    try {
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      const user = response.user.toJSON();

      // Removes secrets from response
      delete user["apiKey"];
      delete user["appName"];
      delete user["authDomain"];
      delete user["stsTokenManager"]["apiKey"];

      return {
        data: {
          user,
        },
        status: 200,
      };
    } catch (error) {
      return {
        data: error,
        status: 400,
      };
    }
  }
}

module.exports = FirebaseService;
