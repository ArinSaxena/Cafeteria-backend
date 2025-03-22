const Counter = require("../models/counter");

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
    const { image, name, merchant } = req.body;
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image;
    const counter = new Counter({ name, image: imageUrl, merchant});
    await counter.save();
    res.status(201).json(counter);
    console.log(counter);
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
