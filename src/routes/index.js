const express = require("express");

const FirebaseForwarder = require("../controllers/FirebaseForwarder");

const firebaseForwarder = new FirebaseForwarder();

const routes = express.Router();

routes.post("/auth/facebook", firebaseForwarder.authWithFacebook);
routes.post("/auth/email/sign-up", firebaseForwarder.signUpWithEmail);
routes.post("/auth/email/sign-in", firebaseForwarder.signInWithEmail);
routes.post("/auth/email/reset-password", firebaseForwarder.resetEmailPassword);

module.exports = routes;
