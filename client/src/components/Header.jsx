import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-slate-200 shadow-md">
            {/* Using justify-between to justify items along the container’s main axis such that there is an equal amount of space between each item */}
            {/* Use items-center to align items along the center of the container’s cross axis */}
            {/* max-w for setting the maximum width of an element. */}
            {/* To center a container, use the mx-auto utility */}
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                {/* adding flex-wrap to make it responsive for lower sizes as well */}
                <Link to='/'>
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-500">Harsha</span>
                        <span className="text-slate-700">Estates</span>
                    </h1>
                </Link>
                {/* Using items-start to align items to the start of the container’s cross axis */}
                <form className="bg-slate-100 p-3 rounded-lg flex items-start">
                    <input
                        type="text"
                        placeholder="Search..."
                        // sm represents the smaller width of minimum 640px and if it is above 640px, width is set for 64
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                    />
                    <FaSearch className="text-slate-600" />
                </form>
                <ul className="flex gap-4 ">
                    {/* hiding it in small size(640px) */}
                    <Link to="/">
                        <li className="hidden sm:inline text-slate-700 hover:underline">
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className="hidden sm:inline text-slate-700 hover:underline">
                            About
                        </li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className="text-slate-700 hover:underline">Sign In</li>
                    </Link>
                </ul>
            </div>
        </header>
    );
}
