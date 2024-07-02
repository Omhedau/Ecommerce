import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";
import bcrypt from "bcrypt";
import jwtProvider from "../config/jwtProvider.js";

const userController = {
  createUser: async (req, res) => {
    try {
      let { firstName, lastName, email, password } = req.body;
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Create a new cart for the user
      const newCart = new Cart({ userId: newUser._id });
      await newCart.save();
  
      // Generate JWT token
      const jwt = jwtProvider.generateToken(newUser._id);
  
      // Return success response with JWT and user info
      res.status(201).json({ message: "User created successfully", jwt, user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user with the provided email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const jwt = jwtProvider.generateToken(user._id);

      // Return success response with JWT and user info
      console.log("login success--->>>");
      res.status(200).json({ message: "Login successful", jwt, user });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Failed to log in user" });
    }
  },

  getUser: async (req, res) => {
    try {
      console.log(req.headers);
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).send({ error: "Authorization header not found" });
      }
  
      const jwt = authHeader.split(" ")[1];
  
      if (!jwt) {
        return res.status(401).send({ error: "Token not found" });
      }

  
      const userId = await jwtProvider.getUserIdFromToken(jwt);
      const user = await User.findById(userId);
      // .populate("address");

     // console.log(user);
  
      if (!user) {
        return res.status(404).send({ error: `User not found with id: ${userId}` });
      }
      console.log("exexcuteed succcck");
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Failed to get user" });
    }
  },

  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error(`User not found with id: ${userId}`);
      }

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};

export default userController;
