import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
    }
// adds the timestamp of the user creation too
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

// exporting the model to use it anywhere else in the application.
export default User;