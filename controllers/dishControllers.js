const Dish = require("../models/dish");

const getDish = async (req, res) => {
  const dishes = await Dish.find().populate("counter");
  res.json(dishes);
};

const getDishByCounterId = async (req, res) => {
  try {
    const { counterId } = req.params;
    const dishes = await Dish.find({ counter: counterId }).populate("counter");
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const addDish = async (req, res) => {
  try {
    const { name, price, inStock, counter, description } = req.body;
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image;
    const dish = new Dish({ name, price, inStock, counter, image: imageUrl, description });
    await dish.save();
    res.status(201).json(dish);
    // console.log(dish);
  } catch (error) {
    res.status(500).json({ error: "Error adding dish" });
  }
};

const editDish = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    
    const { name, price, inStock, description } = req.body;
    // const counter = JSON.parse(req.body.counter);
    // console.log(counter)
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image;
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { name, price, inStock, image: imageUrl, description },
      { new: true }
    );
    // console.log(dish);

    res.status(201).json(dish);
  } catch (error) {
    console.error("Error editing dish:", error);
    res.status(500).json({ error: "Error editing dish", details: error.message });
  }
};

const deleteDishById = async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

module.exports = {
  getDish,
  getDishByCounterId,
  addDish,
  editDish,
  deleteDishById,
};
