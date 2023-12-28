import React from "react";
import { Link } from "react-router-dom";

export default function SignOut() {
    return (
      // using max-w-lg represents the maximum width to be 32rem/512px
      // mx-auto is used to center the div
        <div className="p-3 max-w-lg mx-auto">
            {/* my-7 is used to add margin top and bottom */}
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4">
              {/* using rounded-lg to make the input fields rounded */}
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    id="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                {/* we can add disabled when we want the button to be disabled --> opacity-75 */}
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75">Sign Up</button>
            </form>
            <div className="flex gap-2 mt-5">
              <p>Have an account? <Link to='/sign-in'><span className="text-blue-700 hover: underline">Sign In</span></Link></p>
            </div>
        </div>
    );
}
