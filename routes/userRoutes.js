const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Admin will call these routes not user

//Users
router.get("/", async (req, res) => {
  const users = await User.find().select("-cart");
  res.json(users);
});
router.get("/:id", async (req, res) => {    // TODO: add counters
    const users = await User.findById().select("-cart");
    res.json(users);
  });
router.post('/', async (req,res) => {
  // const {name,email,role} = req.body;
  // console.log(name,email,role);
    const user = new User(req.body);
    
    await user.save();
    res.status(201).json(user);
})
router.put('/:id', async(req,res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(user);
});

router.delete(':/id', async(req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.statusMessage(204).send();

})

module.exports = router;
