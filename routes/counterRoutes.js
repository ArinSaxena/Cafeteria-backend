const express = require("express");

const Counter = require("../models/counter");
const router = express.Router();

//Counters
router.get("/", async (req, res) => {
  const counters = await Counter.find();
  res.json(counters);
});  
router.post("/", async (req, res) => {
  const counter = new Counter(req.body);
  await counter.save();
  res.status(201).json(counter);
});

router.put("/:id", async (req, res) => {
  counterId = req.params.id;
  const counter = await Counter.findByIdAndUpdate(counterId, req.body, {
    new: true,
  });
  res.json(counter);
});
router.delete("/:id", async (req, res) => {
  await Counter.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
