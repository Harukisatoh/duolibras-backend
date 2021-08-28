const express = require("express");

const FirebaseForwarder = require("../controllers/FirebaseForwarder");

const firebaseForwarder = new FirebaseForwarder();

const routes = express.Router();

routes.post("/auth/sign-up/email", firebaseForwarder.signUpWithEmail);
routes.post("/auth/sign-in/email", firebaseForwarder.signInWithEmail);
routes.post("/auth/reset-password", firebaseForwarder.resetEmailPassword);

module.exports = routes;
