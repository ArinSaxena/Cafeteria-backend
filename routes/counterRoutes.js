const express = require("express");
const { getCounter, createCounter, editCounter, deleteCounter } = require("../controllers/counterControllers");
const router = express.Router();

//Counters
router.get("/",getCounter);  
router.post("/", createCounter);

router.put("/:id", editCounter);
router.delete("/:id", deleteCounter);

module.exports = router;
