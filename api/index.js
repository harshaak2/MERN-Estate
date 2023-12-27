import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

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