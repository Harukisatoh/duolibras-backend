const FirebaseService = require("../services/Firebase");

class FirebaseForwarder {
  async loginWithEmailAndPassword(request, response) {
    const { email, password } = request.body;

    const { data, status } = await FirebaseService.signInWithEmailAndPassword(
      email,
      password
    );

    return response.status(status).json(data);
  }
}

module.exports = FirebaseForwarder;
