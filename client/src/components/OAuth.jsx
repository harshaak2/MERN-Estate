import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // we need atleast 2 gmail accounts to create that popup, if there is only one we don't get the pop up
            const result = await signInWithPopup(auth, provider);
            // console.log(result);
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await response.json();
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            console.log("could not connect with google", error);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type="button"
            className="bg-red-700 rounded-lg text-white p-3 uppercase hover:opacity-95"
        >
            Continue with Google
        </button>
    );
}
