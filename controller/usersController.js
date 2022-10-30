const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bctypt = require("bcrypt");

// @description GET all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @description Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body; //take info from input
  // confirm data
  if (!username || !password | Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All field are required" });
  }
  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate user name" });
  }
  // hash password
  const hashedPassword = await bctypt.hash(password, 10); // salt round
  //create new user
  const userObject = { username, password: hashedPassword, roles };
  //create and store new user
  const user = await User.create(userObject);
});

// @description Update a user
// @route PUTCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

// @description DELETE a user
// @route PUTCH /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
