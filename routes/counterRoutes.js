const express = require("express");
const { getCounter, createCounter, editCounter, deleteCounter, getCounterByMerchant } = require("../controllers/counterControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//Counters
router.get("/merchant",authMiddleware,getCounterByMerchant);  

router.get("/",getCounter);  
router.post("/",createCounter);

router.put("/:id",authMiddleware, editCounter);
router.delete("/:id",authMiddleware, deleteCounter);

module.exports = router;
