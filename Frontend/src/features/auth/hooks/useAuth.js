import { useContext } from "react";
import { AuthContext } from "../auth.context";

import {
    login,
    register,
    logout,
    getMe
} from "../services/api.auth";


export const useAuth = () => {

    // AuthContext se global authentication state access
    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;


    // =========================
    // LOGIN
    // =========================

    const handleLogin = async ({ email, password }) => {

        try {

            // API request start
            setLoading(true);

            // Backend login API call
            const data = await login({
                email,
                password
            });

            // Backend se received user ko global state mein save
            setUser(data.user);

            // Component ko success information return
            return data;

        } catch (err) {

            // Login error
            console.error("Login failed:", err);

            // Error ko component tak bhejo
            throw err;

        } finally {

            // Success ya error dono cases mein loading false
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

            // Registration start
            setLoading(true);

            // Backend register API call
            const data = await register({
                username,
                email,
                password
            });

            // Registered user ko global state mein save
            setUser(data.user);

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

            // Logout request start
            setLoading(true);

            // Backend logout API call
            await logout();

            // Frontend authentication state clear
            setUser(null);

        } catch (err) {

            console.error("Logout failed:", err);

            throw err;

        } finally {

            // Logout complete
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