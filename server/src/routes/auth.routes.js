const express = require("express");
const { registerUser, loginUser,logoutUser, refreshAccessToken,CheckAuth } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout",authMiddleware,logoutUser );

router.post("/refresh-token",authMiddleware,refreshAccessToken);

router.get('/me', authMiddleware, CheckAuth);

module.exports = router;