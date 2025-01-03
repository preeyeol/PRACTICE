const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validator = require("validator");

const signUp = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email is already registered
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Check if username is already taken
    const existingUsername = await userSchema.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userSchema({
      email,
      username,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "You have successfully signed up!", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user) {
    return res.status(400).json({ error: "User Not Found" });
  }

  if (user.isVerified === false) {
    return res
      .status(400)
      .json({ success: false, message: "Please verify first" });
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return res.status(400).json({
      error: "Incorrect email or password",
    });
  }
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  res.status(200).json({
    msg: "Login Succesful",
    accessToken: accessToken,
  });
};

const getUsers = async (req, res) => {
  const users = await userSchema.find({});

  res.json(users);
};

module.exports = {
  signUp,

  login,

  getUsers,
};
