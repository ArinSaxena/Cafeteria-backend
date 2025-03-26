const Counter = require("../models/counter");
const uploadMedia = require("../utils/cloudinary"); // Import Cloudinary function

const getCounterByMerchant = async (req, res) => {
  try {
    const merchantId = req.user._id; // Get merchant ID from authenticated user
    const counters = await Counter.find({ merchant: merchantId });

    if (!counters.length) {
      return res
        .status(404)
        .json({ message: "No counters found for this merchant" });
    }

    res.json(counters);
  } catch (error) {
    console.error("Error fetching counters:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getCounter = async (req, res) => {
  try {
    const counters = await Counter.find().populate("merchant", "name"); // Only fetch the name of the merchant
    res.json(counters);
  } catch (error) {
    console.error("Error fetching counters:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createCounter = async (req, res) => {
  try {
    const { name, merchant } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    // ✅ Convert image to Base64 format for Cloudinary
    const fileBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
console.log("hello")
    // ✅ Upload the image to Cloudinary
    const uploadResponse = await uploadMedia(fileBase64);
    const imageUrl = uploadResponse.secure_url; // Get Cloudinary image URL
    console.log("hello")

console.log(imageUrl);
    const counter = new Counter({
      name,
      merchant,
      image:imageUrl
    });
    await counter.save();
    res.status(201).json(counter);
  } catch (error) {
    res.status(500).json({ error: "Error creating counter" });
  }
};

const editCounter = async (req, res) => {
  const counterId = req.params.id;
  const counter = await Counter.findByIdAndUpdate(counterId, req.body, {
    new: true,
  });
  res.json(counter);
};

const deleteCounter = async (req, res) => {
  await Counter.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

module.exports = {
  getCounterByMerchant,
  getCounter,
  createCounter,
  editCounter,
  deleteCounter,
};
