const express = require("express");
const { getDish, getDishByCounterId, addDish, editDish, deleteDishById } = require("../controllers/dishControllers");
const router = express.Router();

//Dishes

router.get("/", getDish);

router.get("/:counterId",getDishByCounterId);

router.post("/",addDish);

router.put("/:id",editDish);

router.delete("/:id", deleteDishById);

module.exports = router;
