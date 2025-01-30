const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const sessions = new Set(); // Stores refresh tokens

const REFRESH_TOKEN_SECRET= "super30";
const ACCESS_TOKEN_SECRET = "explorin";

const generateToken = (data) => {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ name: username, password: hash, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Username not registered!" });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(401).json({ message: "Incorrect password!" });
  }
  const tokenData = { id: user._id };
  const refresh_token = jwt.sign(tokenData, REFRESH_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  sessions.add(refresh_token);

  const token = generateToken(tokenData);

  return res.json({ token, refresh_token });
};

const refreshToken = (req, res) => {
  const refresh_token = req.body.token;

  if (!sessions.has(refresh_token)) {
    return res.status(400).json({ message: "You need to log in" });
  }

  jwt.verify(
    refresh_token,
    REFRESH_TOKEN_SECRET,
    (err, token_data) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden", error: err.message });
      }

      const token = generateToken({ id: token_data.id });
      return res.json({ token });
    }
  );
};

const logout = (req, res) => {
  const refreshToken = req.body.token;

  if (!sessions.has(refreshToken)) {
    return res.status(400).json({ message: "No operation" });
  }

  sessions.delete(refreshToken);
  return res.status(204).json({ message: "Logged out" });
};

const getUser= async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findById(id).select("-password");
    console.log(user);
    if(!user){
      return res.status(404).json({message:"User not found!"})
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
module.exports = { register, login, refreshToken, logout,getUser };
