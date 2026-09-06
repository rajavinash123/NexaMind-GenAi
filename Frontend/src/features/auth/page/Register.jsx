import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        console.log({
            name,
            email,
            password
        });

        // Register successful hone ke baad
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
            >

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Register your account to get started
                    </p>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                >
                    Register
                </button>

                {/* Login link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?<Link
                        to="/login"
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default Register;