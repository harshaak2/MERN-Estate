import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData, //existing formData
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            // created a proxy server in vite.config.js for the route /api

            //* fetch is used to make an asynchronous HTTP POST req to the route /api/auth/signup -- refer auth.route, auth.controller
            //* method: POST specifies that it is a POST method
            //* 'Content-Type' set to 'application/json' indicates that the req body is in json format
            //* body: JSON.stringify() sends the form data after converting it to a string
            //* response.json() reads the response body and parses it to JSON
            //* db logic is implemented in auth.controller.js and the routing logic is implemented in auth.route.js
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in')
            console.log(data);
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
    };
    // console.log(formData);

    return (
        // using max-w-lg represents the maximum width to be 32rem/512px
        // mx-auto is used to center the div
        <div className="p-3 max-w-lg mx-auto">
            {/* my-7 is used to add margin top and bottom */}
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* using rounded-lg to make the input fields rounded */}
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
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
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>
                    Have an account?{" "}
                    <Link to="/sign-in">
                        <span className="text-blue-700 hover: underline">
                            Sign In
                        </span>
                    </Link>
                </p>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
