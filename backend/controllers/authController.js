import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    const { username, email,  password, preferences } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username,email, password: hashedPassword, preference: preferences }); // Use 'preference'
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const profile = async (req, res) => {
    const username = req.user.username;
    res.json({
        username: username
    })
}

export { signup, login, profile};
