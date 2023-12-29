import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//* useDispatch is used to dispatch the function that we have
//* useSelector is used to extract and subscribe to parts of redux state within a functional component
import { useDispatch, useSelector } from "react-redux"; 
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {

    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    //* useSelector takes in the entire Redux state and returns the specific part of the state the component needs (user here)
    //* user is from userSlice.js
    //* destructuring the state object received from the user slice into variables 'loading' and 'error'
    const {loading, error} = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
        setFormData({
            ...formData, //existing formData
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // setLoading(true);
            dispatch(signInStart());

            // created a proxy server in vite.config.js for the route /api
            //* fetch is used to make an asynchronous HTTP POST req to the route /api/auth/signup -- refer auth.route, auth.controller
            //* method: POST specifies that it is a POST method
            //* 'Content-Type' set to 'application/json' indicates that the req body is in json format
            //* body: JSON.stringify() sends the form data after converting it to a string
            //* response.json() reads the response body and parses it to JSON
            //* db logic is implemented in auth.controller.js and the routing logic is implemented in auth.route.js
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === false) {
                // setLoading(false);
                // setError(data.message);
                dispatch(signInFailure(data.message));
                return;
            }
            // setLoading(false);
            // setError(null);
            dispatch(signInSuccess());
            navigate('/')
            // console.log(data);
        } catch (error) {
          // setLoading(false);
          // setError(error.message);
          dispatch(signInFailure(error.message))
        }
    };
    // console.log(formData);

    return (
        // using max-w-lg represents the maximum width to be 32rem/512px
        // mx-auto is used to center the div
        <div className="p-3 max-w-lg mx-auto">
            {/* my-7 is used to add margin top and bottom */}
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* using rounded-lg to make the input fields rounded */}
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                {/* we can add disabled when we want the button to be disabled --> opacity-75 */}
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75"
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>
                    Dont have an account?{" "}
                    <Link to="/sign-up">
                        <span className="text-blue-700 hover: underline">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
