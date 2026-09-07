import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {

    // useAuth() ek object return karta hai
    // Isliye object destructuring use karenge
    const {
        loading,
        handleRegister
    } = useAuth();


    // Form ki local state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // Programmatically route change karne ke liye
    const navigate = useNavigate();


    // Form submit hone par ye function chalega
    async function handleSubmit(e) {

        // Browser ka default form submission prevent
        e.preventDefault();

        try {

            // useAuth ke handleRegister ko call kar rahe hain
            // Form ka data hook ko pass kar rahe hain
            await handleRegister({
                username,
                email,
                password
            });


            // Registration successful hone ke baad login page par jao
            navigate("/");

        } catch (error) {

            // Registration fail hone par error handle
            console.error("Registration failed:", error);

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

                {/* =========================
                    HEADING
                ========================== */}

                <div className="mb-6 text-center">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Register your account to get started
                    </p>

                </div>


                {/* =========================
                    USERNAME
                ========================== */}

                <div className="mb-4">

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}

                        // Input change hone par username state update
                        onChange={(e) => setUsername(e.target.value)}

                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>


                {/* =========================
                    EMAIL
                ========================== */}

                <div className="mb-4">

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}

                        // Input change hone par email state update
                        onChange={(e) => setEmail(e.target.value)}

                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>


                {/* =========================
                    PASSWORD
                ========================== */}

                <div className="mb-6">

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}

                        // Input change hone par password state update
                        onChange={(e) => setPassword(e.target.value)}

                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>


                {/* =========================
                    REGISTER BUTTON
                ========================== */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
                >
                    Register
                </button>


                {/* =========================
                    LOGIN LINK
                ========================== */}

                <p className="mt-6 text-center text-sm text-gray-500">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Register;