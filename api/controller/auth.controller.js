import { error, log } from "console";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    // req.body is the information that we get from the browser
    const { username, email, password } = req.body;
    // 10 is the salt value
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, hashedPassword });

    try {
        await newUser.save();
        // If the save is successful, return a success response
        return res
            .status(200)
            .json({ success: true, message: "User registered successfully" });
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            // Creating a new error object for duplicate entry
            const duplicateError = new Error(
                "Username or email already exists"
            );
            duplicateError.statusCode = 409; // Setting a 409 status code for duplicate entry
            // return next(duplicateError); // Passing the specific error to the error-handling middleware
            return next(
                errorHandler(duplicateError.statusCode, duplicateError.message)
            );
        } else {
            // For other errors, pass the original error to the error-handling middleware
            return next(
                errorHandler(error.statusCode, "error from the function")
            );
        }
    }

    // adding status 201 to make sure that something is created
    // res.status(201).json("User created successfully!");
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        const validPassword = bcryptjs.compareSync(
            password,
            validUser.hashedPassword
        );
        if (!validPassword) {
            return next(errorHandler(401, "Invalid Credentials!"));
        }

        // after all the successful validations, we create a token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // destructuring using ._doc to hide the hashedPassword when the POST request is made
        const {hashedPassword: pass, ...rest} = validUser._doc;

        // using httpOnly to make it secured that no other third party can access it
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};
