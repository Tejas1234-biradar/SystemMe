import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/users.js";
import Note from "./models/notes.js";
import Budget from "./models/budget.js";
import Task from "./models/tasks.js";
import Workout from "./models/workout.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config(); // Load .env variables

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Notes Routes
app.post('/note', authMiddleware, async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newNote = new Note({ title, desc, userId: req.user.userId });
    await newNote.save();

    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("❌ Error saving note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/note', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Budget Routes
app.post('/budget', authMiddleware, async (req, res) => {
  try {
    const { amount, category } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ message: "Amount and category are required" });
    }

    const newBudget = new Budget({ amount, category, userId: req.user.userId });
    await newBudget.save();

    res.status(201).json({ message: "Budget created successfully", budget: newBudget });
  } catch (error) {
    console.error("❌ Error saving budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Tasks Routes
app.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newTask = new Task({ title, description, userId: req.user.userId });
    await newTask.save();

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("❌ Error saving task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Workout Routes
app.post('/workout', authMiddleware, async (req, res) => {
  try {
    const { type, duration } = req.body;
    if (!type || !duration) {
      return res.status(400).json({ message: "Type and duration are required" });
    }

    const newWorkout = new Workout({ type, duration, userId: req.user.userId });
    await newWorkout.save();

    res.status(201).json({ message: "Workout created successfully", workout: newWorkout });
  } catch (error) {
    console.error("❌ Error saving workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
