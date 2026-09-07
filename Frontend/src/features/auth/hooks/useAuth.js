import { useContext } from "react";
import { AuthContext } from "../auth.context";

import {
    login,
    register,
    logout,
} from "../services/api.auth";


export const useAuth = () => {

    // Global authentication state access
    const {
        user,
        setUser,
        loading,
        setLoading
    } = useContext(AuthContext);


    // =========================
    // LOGIN
    // =========================

    const handleLogin = async ({ email, password }) => {

        try {
            // Login request start
            setLoading(true);

            // Backend login API
            const data = await login({
                email,
                password
            });

            // Login ke baad user ko global state mein save
            setUser(data.user);

            return data;

        } catch (err) {

            console.error("Login failed:", err);

            // Error ko Login component tak bhejo
            throw err;

        } finally {

            // Request complete
            setLoading(false);
        }
    };


    // =========================
    // REGISTER
    // =========================

    const handleRegister = async ({
        username,
        email,
        password
    }) => {

        try {
            // Registration request start
            setLoading(true);

            // Backend register API
            const data = await register({
                username,
                email,
                password
            });

            // IMPORTANT:
            // Register ke baad user ko login page par bhejna hai,
            // isliye yahan setUser() ki zarurat nahi hai.

            return data;

        } catch (err) {

            console.error("Registration failed:", err);

            throw err;

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = async () => {

        try {
            setLoading(true);

            // Backend logout
            await logout();

            // Frontend auth state clear
            setUser(null);

        } catch (err) {

            console.error("Logout failed:", err);

            throw err;

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // RETURN
    // =========================

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};