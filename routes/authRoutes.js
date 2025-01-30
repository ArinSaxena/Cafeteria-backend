const express = require("express");
const router = express.Router();
const {register, login, refreshToken, logout, getUser} = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/token", refreshToken);
router.delete("/logout", logout);
router.get("/:id",getUser )

module.exports = router;
