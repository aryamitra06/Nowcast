import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        //@case 1: 
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User Doesn't Exist" });

        //@case 2:
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Email or Password" })

        //@case 3: (Success)
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "aryaop", { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName, imageUrl } = req.body;

    try {
        //@case 1:
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already Exists" });

        //@case 2: (Success)
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, imageUrl });
        const token = jwt.sign({ email: result.email, id: result._id }, "aryaop", { expiresIn: "1h" });
        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}