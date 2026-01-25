import { useState, useEffect } from "react";
import api from "../service/api";

function Feedback() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [message, setMessage] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!emailRegex.test(formData.email)) {
            formData.email = "";
            setMessage("Invalid email");
            return;
        }

        await api.post("/Feedback", formData);
        formData.name = "";
        formData.email = "";
        formData.message = "";
        setMessage("Your Valuable Feedback Added,Thank you");
    };
    return (
        <section id="feedback" className="w-full flex justify-center items-center py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
            <div className="w-full max-w-2xl mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-bold text-white text-center">We Value Your Feedback</h2>

                <p className="text-gray-400 text-center mt-2">Help us improve Vyolo Tech experience</p>

                {message && (
                    <p className={`${message === "Invalid email" ? "text-red-500" : "text-green-500"} text-center mt-3`}>
                        {message}
                    </p>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Your Feedback</label>
                        <textarea
                            rows="4"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Share your thoughts with us..."
                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition duration-300 shadow-lg"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Feedback;
