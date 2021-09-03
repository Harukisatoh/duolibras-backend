const express = require("express");

const AuthController = require("../controllers/AuthController");

const authController = new AuthController();

const routes = express.Router();

routes.post("/auth/facebook", authController.authWithFacebook);
routes.post("/auth/email/sign-up", authController.signUpWithEmail);
routes.post("/auth/email/sign-in", authController.signInWithEmail);
routes.post("/auth/sign-out", authController.signOut);
routes.post("/auth/email/reset-password", authController.resetEmailPassword);

module.exports = routes;
