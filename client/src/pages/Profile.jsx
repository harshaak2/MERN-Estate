import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="p-3 max-w-lg mx-auto">
            {/* Resize an element’s content to cover its container using object-cover */}
            <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                {/* for images, we use self-center to center them */}
                <img
                    src={currentUser.avatar}
                    alt="profile-image"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="border p-3 rounded-lg"
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                />
                <button className="bg-slate-700 uppercase text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
              <span className="text-red-700 cursor-pointer">Delete Account</span>
              <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
