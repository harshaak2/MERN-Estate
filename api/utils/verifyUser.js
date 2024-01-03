import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(401, 'Unauthorized'))
    }

    //* jwt.verify is used to verify and decode a jwt token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(errorHandler(403, 'Forbidden'));
        }
        //* upon successful verification, decoded information is assigned to the user property of req object.
        //* sending the information inside the request
        req.user = user;
        //* next() goes on to the handler function updateUser mentioned in user.route.js
        next(); 
    })
}