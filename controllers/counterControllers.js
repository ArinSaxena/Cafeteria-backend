const Counter = require("../models/counter");

const getCounterByMerchant = async (req, res) => {
    try {
      const merchantId = req.user._id; // Get merchant ID from authenticated user
      const counters = await Counter.find({ merchant: merchantId });
  
      if (!counters.length) {
        return res.status(404).json({ message: "No counters found for this merchant" });
      }
  
      res.json(counters);
    } catch (error) {
      console.error("Error fetching counters:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

const getCounter =  async (req, res) => {
    const counters = await Counter.find();
    res.json(counters);
  }

  const createCounter =async (req, res) => {
    const counter = new Counter(req.body);
    await counter.save();
    res.status(201).json(counter);
  }

  const editCounter =async (req, res) => {
    counterId = req.params.id;
    const counter = await Counter.findByIdAndUpdate(counterId, req.body, {
      new: true,
    });
    res.json(counter);
  }

  const deleteCounter =async (req, res) => {
    await Counter.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }

  module.exports = {getCounterByMerchant,getCounter,createCounter,editCounter,deleteCounter};