const express = require("express");
const { getCounter, createCounter, editCounter, deleteCounter, getCounterByMerchant } = require("../controllers/counterControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");  // Importing multer middleware
const router = express.Router();

//Counters
router.get("/merchant",authMiddleware,getCounterByMerchant);  
router.get("/",getCounter);  
router.post("/",upload.single("image"),createCounter);

router.put("/:id",authMiddleware, editCounter);
router.delete("/:id", deleteCounter);

module.exports = router;
