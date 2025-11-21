const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate
        if (!username || !email || !password) {
            return res.status(500).json({
                success: false,
                message: "All fields are required!",
            })
        }

        // check existing user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(500).json({
                success: false,
                message: "User already exist",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new userModel({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registerd!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Register API",
            error
        })
    }
}

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        // 2. Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!",
            });
        }

        // 3. Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "defaultsecret",
            { expiresIn: "1h" }
        );



        // 4. Respond success
        return res.status(200).json({
            success: true,
            message: "Login Successfully!",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });


    } catch (error) {
        console.error("Login error:", error);
        
        return res.status(500).json({
            success: false,
            message: "Server error during login",
            error: error.message,
        });
    }
}

module.exports = { register, login };