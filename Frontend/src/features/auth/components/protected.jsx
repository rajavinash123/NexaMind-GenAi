import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {

    // AuthContext se user aur loading state le rahe hain
    const { loading, user } = useAuth();

    // Jab authentication check ho raha hai
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1>Loading.....</h1>
            </div>
        );
    }

    // Agar user login nahi hai
    // to Login page par redirect kar do
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Agar user login hai
    // to protected component render karo
    return children;
};

export default Protected;