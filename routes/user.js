const express = require("express");
const router = express.Router();

const { login, register, dashboard, getAllUsers, getUserProfile, updateUserProfile} = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);

router.route("/me").get(authMiddleware, getUserProfile);
router.route("/profile").put(authMiddleware, updateUserProfile);

module.exports = router;