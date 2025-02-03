const Counter = require("../models/counter");

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

  module.exports = {getCounter,createCounter,editCounter,deleteCounter};