import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Forget() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        rePass: "",
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

        try {
            const res = await api.get(`/users?email=${formData.email}`);

            if (res.data.length === 0) {
                setError("The email is not valid");
                return;
            }

            const id = res.data[0].id;

            await api.patch(`/users/${id}`, {
                password: rePass,
            });

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 class="text-2xl font-semibold text-center"></h2>
                <p class="text-center text-gray-500 mt-1">Sign up to get started</p>

                <form onSubmit={handleSubmit} class="mt-6 space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            value={formData.email}
                            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Password</label>
                        <input
                            name="pass"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            value={formData.pass}
                            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Re-enter Password</label>
                        <input
                            name="rePass"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            value={formData.rePass}
                            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <button
                        type="submit"
                        class="w-full mt-2 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
                    >
                        Register
                    </button>
                </form>
                <div className="flex items-center justify-between">
                    <Link to="/login" class="font-medium text-black underline cursor-pointer">
                        Login
                    </Link>
                    {error && <p className="text-red-500 mt-5">{error}</p>}
                    <p class="text-sm text-center text-gray-500 ">Already have an account?</p>
                </div>
            </div>
        </div>
    );
}

export default Forget;
