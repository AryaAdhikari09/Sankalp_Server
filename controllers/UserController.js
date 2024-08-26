const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    try {
        const { username, password, name, age, classLevel, parentQualification, spokenLanguages } = req.body;

        const userByUsername = await User.findOne({ username });
        if (userByUsername) {
            return res.status(401).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            password: hashedPassword,
            name,
            age,
            classLevel,
            parentQualification,
            spokenLanguages
        });

        res.status(200).json({ message: "User created successfully", id: user._id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUserId = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json(user._id);
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createUser, getUser, getUserById, getUserId };
