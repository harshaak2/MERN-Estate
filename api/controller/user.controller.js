import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.send("Hello World from user controller");
}

export const updateUser = async (req, res) => {
    //* the first parameter is the one we are getting from jwt.verifyToken in verifyUser.js 
    //* the second parameter is the one we are getting from the route 
    if(req.user.id !== req.params.id){
        return nextTick(errorHandler(401, 'You can only update your own account!'))
    }
    
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const {hashedPassword: pass, ...rest} = updatedUser._doc;

        return res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}