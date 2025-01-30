const express = require("express");

const Dish = require("../models/dish");
const router = express.Router();

//Dishes

router.get("/", async (req, res) => {
  const dishes = await Dish.find().populate("counter");
  res.json(dishes);
});

router.get("/:counterId", async (req, res) => {
  try {
    const { counterId } = req.params;
    const dishes = await Dish.find({ counter: counterId }).populate("counter");
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body)
  const dish = new Dish(req.body);
  await dish.save();
  res.status(201).json(dish);
});

router.put("/:id", async (req, res) => {
  const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(dish);
});

router.delete("/:id", async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
