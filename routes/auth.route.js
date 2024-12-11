const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/refresh-token", refreshToken);
router.post("/logout", logout);
module.exports = router;
