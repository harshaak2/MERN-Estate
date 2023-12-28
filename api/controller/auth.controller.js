import { log } from "console";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    // req.body is the information that we get from the browser
    const { username, email, password } = req.body;
    // 10 is the salt value
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, hashedPassword });

    try {
        // using await to pause the execution of the current async function until the promise is returned by newUser.save()
        await newUser.save();
    } catch (error) {
        res.status(500).json(error.message);
    }

    // adding status 201 to make sure that something is created
    res.status(201).json("User created successfully!");
};
