const firebase = require("firebase");
const { firebase: firebaseConfig } = require("../configs");

firebase.initializeApp(firebaseConfig);

module.exports = firebase.default;
