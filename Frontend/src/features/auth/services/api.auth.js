import axios from "axios";

const BASE_URI = "http://localhost:3000";

// ===============================
// REGISTER USER
// ===============================

async function register(data) {
    try {
        const response = await axios.post(
            `${BASE_URI}/api/auth/register`,
            data,
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {
        console.log(err, "Registration error");
        throw err;
    }
}


// ===============================
// LOGIN USER
// ===============================

async function login(data) {
    try {
        const response = await axios.post(
            `${BASE_URI}/api/auth/login`,
            data,
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {
        console.log(err, "Login error");
        throw err;
    }
}


// ===============================
// GET CURRENT USER
// ===============================

async function getMe(id) {
    try {
        const response = await axios.get(
            `${BASE_URI}/api/auth/get-me/${id}`,
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {
        console.log(err, "Get user error");
        throw err;
    }
}


// ===============================
// LOGOUT USER
// ===============================

async function logout(id) {
    try {
        const response = await axios.post(
            `${BASE_URI}/api/auth/logout/${id}`,
            {},
            {
                withCredentials: true
            }
        );

        return response.data;

    } catch (err) {
        console.log(err, "Logout error");
        throw err;
    }
}


// ===============================
// EXPORT
// ===============================

export default {
    register,
    login,
    logout,
    getMe
};