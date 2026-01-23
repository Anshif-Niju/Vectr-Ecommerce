import React, { useState, useEffect } from "react";
import { Link, Navigate, BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            navigate("/home");
        }
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        pass: "",
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

        try {
            const res = await api.get(`/users?email=${formData.email}`);

            if (formData.email == "" || formData.pass == "") {
                setError("All fields are required");
                return;
            }

            if (res.data.length === 0) {
                setError("User not found. Please register");
                setFormData({
                    email: "",
                    pass: "",
                });
                return;
            }

            const user = res.data[0];

            if (user.password !== formData.pass) {
                setError("Incorrect password");
                setFormData({
                    pass: "",
                });
                return;
            }

            sessionStorage.setItem("user", JSON.stringify(user));

            navigate("/home",{ replace: true });

        } catch (error) {

            setError("The Server is not responding....");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
                <p className="text-center text-gray-500 mt-2">Login to your account</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Email */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>

                    {/* Password */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            name="pass"
                            value={formData.pass}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>

                    {error && <p className="text-center text-red-500 mt-2">{error}</p>}
                    <div className="flex items-center justify-between text-sm">
                        <Link to="/forget" className="text-black hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <span className="text-black font-medium cursor-pointer hover:underline">
                        <Link to="/register" replace>
                            {" "}
                            Register{" "}
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
