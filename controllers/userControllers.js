const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select("-cart");
    res.json(users);
    // const users = await User.find().select("-cart");
    // res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  // TODO: add counters
  const users = await User.findById().select("-cart");
  res.json(users);
};

const saveUser = async (req, res) => {
  // const {name,email,role} = req.body;
  // console.log(name,email,role);
  const user = new User(req.body);

  await user.save();
  res.status(201).json(user);
};

const updateUserById = async (req, res) => {
    try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.statusMessage(204).send();
};

module.exports = {
  getUser,
  getUserById,
  saveUser,
  updateUserById,
  deleteUserById,
};
