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
    const { name, price, inStock, counter } = req.body;
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image;
    const dish = new Dish({ name, price, inStock, counter, image: imageUrl });
    await dish.save();
    res.status(201).json(dish);
    console.log(dish);
  } catch (error) {
    res.status(500).json({ error: "Error adding dish" });
  }
};

const editDish = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const { name, price, inStock, counter } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image;
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { name, price, inStock, counter, image: imageUrl },
      { new: true }
    );
    console.log(dish);

    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ error: "Error editing dish" });
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
