const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");

const Student = require("./models/student.model");
const User = require("./models/user.model");
const path = require("path");



const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/StudentInformationSystem")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

let students = [];


app.get("/fetchstudents", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students" });
    }
});


app.post("/addstudentmongo", async (req, res) => {
    const newStudent = req.body;

    try {
        const student = new Student(newStudent);
        await student.save();
        res.status(201).json(student);
        console.log("Added Student:", student);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "ID Number already exists. Please use a unique ID." });
        } else {
            console.error("Error adding student:", error);
            res.status(500).json({ message: "Error adding student" });
        }
    }
});


app.put("/updatestudent/:id", async (req, res) => {
    const { id } = req.params;
    const updatedStudent = req.body;

    try {
        const student = await Student.findOneAndUpdate({ id: id }, updatedStudent, { new: true });
        if (student) {
            res.json({ message: "Student updated successfully", updatedStudent: student });
            console.log("Updated Student:", student);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Error updating student" });
    }
});


app.get("/", (req, res) => {
    res.send("Lyle koa cutie!");
});


const port = 1337;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.delete("/deletestudent/:id", async (req, res) => {
    const { id } = req.params;
    const initialLength = students.length;
    
    try {
        const student = await Student.findOneAndDelete({ id: id });
        if (student) {
            res.json({ message: "Student deleted successfully" });
            console.log("Deleted Student ID:", id);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Error deleting student" });
    }
});

app.post("/signup", async (req, res) => {
   const { id, firstName, middleName, lastName, email, password } = req.body;

   console.log("Sign-up request body:", req.body); // Log the request body for debugging

   try {
       // Check if the email already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ message: "Email already exists." });
       }

       // Check if the ID already exists
       const existingId = await User.findOne({ id });
       if (existingId) {
           return res.status(400).json({ message: "ID already exists." });
       }

       // Create a new user
       const newUser = new User({
           id,
           firstName,
           middleName,
           lastName,
           email,
           password,
       });

       // Save the new user to the database
       await newUser.save();
       res.status(201).json({ message: "User signed up successfully", user: newUser });
   } catch (error) {
       console.error("Error signing up user:", error); // Log the error for debugging

       // Handle duplicate key errors (e.g., unique constraints)
       if (error.code === 11000) {
           res.status(400).json({ message: "Duplicate key error: ID or Email already exists." });
       } 
       // Handle validation errors
       else if (error.name === "ValidationError") {
           res.status(400).json({ message: "Validation error", error: error.message });
       } 
       // Handle other errors
       else {
           res.status(500).json({ message: "Error signing up user", error: error.message });
       }
   }
});
 // Login Route
 app.post("/login", async (req, res) => {
   const { email, password } = req.body;

   console.log("Login request body:", req.body); // Log the request body for debugging

   try {
       // Find the user by email
       const user = await User.findOne({ email });

       if (!user) {
           return res.status(404).json({ message: "User not found." });
       }

       // Check if the password matches
       if (user.password !== password) {
           return res.status(401).json({ message: "Invalid password." });
       }

       res.status(200).json({ message: "Login successful", user });
   } catch (error) {
       console.error("Error during login:", error);
       res.status(500).json({ message: "Error during login" });
   }
});
 
 // Fetch Users Route
 app.get("/fetchusers", async (req, res) => {
   try {
       const users = await User.find(); // Fetch all users from the database
       res.status(200).json(users); // Send the users as a JSON response
   } catch (error) {
       console.error("Error fetching users:", error);
       res.status(500).json({ message: "Error fetching users" });
   }
});