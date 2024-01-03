import express from "express";
import { test, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
// /update/:id is set up to listen for POST requests
// verifyToken is a middleware function and updateUser is a handler function
router.post('/update/:id', verifyToken, updateUser)

export default router;