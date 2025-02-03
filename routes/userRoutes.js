const express = require("express");
const User = require("../models/user");
const { getUser, getUserById, saveUser, updateUserById, deleteUserById } = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin will call these routes not user

//Users
router.get("/",authMiddleware,getUser);

router.get("/:id", authMiddleware,getUserById);
router.post("/", authMiddleware,saveUser);

router.put("/:id",authMiddleware, updateUserById);

router.delete(":/id",authMiddleware, deleteUserById);


module.exports = router;
