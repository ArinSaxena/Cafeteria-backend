const express = require("express");
const User = require("../models/user");
const { getUser, getUserById, saveUser, updateUserById, deleteUserById } = require("../controllers/userControllers");

const router = express.Router();

// Admin will call these routes not user

//Users
router.get("/",getUser);

router.get("/:id", getUserById);
router.post("/", saveUser);

router.put("/:id", updateUserById);

router.delete(":/id", deleteUserById);


module.exports = router;
