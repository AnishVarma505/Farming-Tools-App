import axios from "axios";

export const registerUser = async (userData, navigate) => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/register", userData, { withCredentials: true });

        // Store user data in localStorage or state
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect to Tools Page
        navigate("/tools");

    } catch (error) {
        console.error("Registration Failed:", error.response?.data?.message || error.message);
    }
};
