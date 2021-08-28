const express = require("express");

const FirebaseForwarder = require("../controllers/FirebaseForwarder");

const firebaseForwarder = new FirebaseForwarder();

const routes = express.Router();

routes.post("/login/email", firebaseForwarder.loginWithEmailAndPassword);
routes.post("/reset-password", firebaseForwarder.resetPassword);

module.exports = routes;
