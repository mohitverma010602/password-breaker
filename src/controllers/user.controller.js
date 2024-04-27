import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller function for user registration
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All credentials are required" });
    }

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create a new user record
    const user = await User.create({ username, email, password });

    // Return the newly created user object
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Controller function for user login
const loginUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    // Optionally, you can sanitize sensitive user data before sending it to the client
    const sanitizedUser = {
      username: req.user.username,
      email: req.user.email,
    };
    res.status(200).json({ user: sanitizedUser });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
});

// Controller function for user logout
const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear session cookie
    res.clearCookie("connect.sid");

    // Delete session ID
    req.sessionId = null;

    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Failed to logout user" });
      }
      res.sendStatus(200);
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Failed to logout user" });
  }
});

export { registerUser, loginUser, logoutUser };
