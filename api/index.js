import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Successfully connected to the Database");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

// request is the data that we get from the client side
// response is the data that we send back from the server side
//? this sets up an with a single GET endpoint '/test' that sends a Hello World response and 
//? then integrates this router with an Express application to handle requests starting with /api/user
//* Express router is a way to organize and modularize your route handling in an Express.js application.
//* It provides a more structured approach for handling different routes and HTTP methods by splitting them into separate modules or files
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// creating a middleware
app.use((err, req, res, next) => {
    // get a statusCode from the error or use 500(internal server error)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})