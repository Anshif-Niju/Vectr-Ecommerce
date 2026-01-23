import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Register() {
    const navigate = useNavigate();

    const nameRegex = /^[A-Za-z ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role:"user"

    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nameRegex.test(formData.name)) {
            setError("Invalid name");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setError("Invalid email");
            return;
        }
        if (formData.password == "") {
            setError("Please enter password");
            return;
        }

        try {
            const res = await api.get(`/users?email=${formData.email}`);
            if (res.data.length > 0) {
                setError("The email is already taken");
                return;
            }

            await api.post("/users", formData);
            navigate("/login");
        } catch (error) {
            console.log("Oops!" + error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-center">Create Account</h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        minlength="4"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <div className="flex items-center justify-between">
                        <Link to="/login" className="text-sm text-gray-600 underline hover:text-blue-800 text-right">
                            Login
                        </Link>

                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-2 rounded">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
