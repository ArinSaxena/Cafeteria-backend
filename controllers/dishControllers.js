const Dish = require("../models/dish");
const cloudinary = require("../utils/cloudinary");
const  uploadMedia  = require("../utils/cloudinary"); // Import Cloudinary function
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
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    

    // ✅ Convert image to Base64 format for Cloudinary
    const fileBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    // ✅ Upload the image to Cloudinary
    const uploadResponse = await uploadMedia(fileBase64);
    const imageUrl = uploadResponse.secure_url; // Get Cloudinary image URL

    const dish = new Dish({
      name,
      price,
      inStock,
      counter,
      image: imageUrl, // ✅ Save Cloudinary URL
      description,
    });

    await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ error: "Error adding dish" });
  }
};

const editDish = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, price, inStock, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const fileBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const uploadResponse = await uploadMedia(fileBase64);
    const imageUrl = uploadResponse.secure_url; 
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { name, price, inStock, image: imageUrl, description },
      { new: true }
    );
    // console.log(dish);

    res.status(201).json(dish);
  } catch (error) {
    console.error("Error editing dish:", error);
    res
      .status(500)
      .json({ error: "Error editing dish", details: error.message });
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
