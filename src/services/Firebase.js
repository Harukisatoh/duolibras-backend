const Firebase = require("../integrations/firebase");

class FirebaseService {
  static timestamp = Firebase.database.ServerValue.TIMESTAMP;

  static async signInWithEmailAndPassword(email, password) {
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

    return user;
  }

  static async resetPassword(email) {
    await Firebase.auth().sendPasswordResetEmail(email);
  }
}

module.exports = FirebaseService;
