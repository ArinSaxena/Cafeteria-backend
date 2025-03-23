const express = require("express");
const { getDish, getDishByCounterId, addDish, editDish, deleteDishById } = require("../controllers/dishControllers");
const upload = require("../middlewares/multer.js");  // Importing multer middleware
const router = express.Router();

//Dishes

router.get("/", getDish);

router.get("/:counterId",getDishByCounterId);

router.post("/",upload.single("image"),addDish);

router.put("/:id",upload.single("image"),editDish);

router.delete("/:id", deleteDishById);

module.exports = router;
