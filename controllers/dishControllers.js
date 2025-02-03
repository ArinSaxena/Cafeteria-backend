const Dish = require("../models/dish");

 const getDish =async (req, res) => {
    const dishes = await Dish.find().populate("counter");
    res.json(dishes);
  }

  const getDishByCounterId = async (req, res) => {
    try {
      const { counterId } = req.params;
      const dishes = await Dish.find({ counter: counterId }).populate("counter");
      res.json(dishes);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }

  const addDish = async (req, res) => {
    // console.log(req.body)
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
  }
  const editDish = async (req, res) => {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(dish);
  }
  const deleteDishById =async (req, res) => {
    await Dish.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }

  module.exports = {getDish, getDishByCounterId, addDish, editDish, deleteDishById}