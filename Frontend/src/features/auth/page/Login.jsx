import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

    // useAuth se authentication state aur login function
    const { loading, handleLogin } = useAuth();

    // Login form ki local state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Programmatically page change karne ke liye
    const navigate = useNavigate();


    // Form submit handler
    async function handleSubmit(e) {

        // Browser ka default form submit prevent
        e.preventDefault();

        // Login API call
        const success = await handleLogin({
            email,
            password
        });

        // Sirf successful login ke baad navigate
        if (success) {
            navigate("/")
        }
    }


  // Jab registration API request chal rahi hai
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1>Loading.....</h1>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
            >

                {/* Heading */}
                <div className="text-center mb-6">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to your account
                    </p>

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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>


                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    Login
                </button>


                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-gray-500">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
};

export default Login;