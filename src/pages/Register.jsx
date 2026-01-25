import {  Link } from "react-router-dom";
import {  useRegister } from "../hook/useRegister";

function Register() {
    
    const {formData,handleChange,handleSubmit,error}=useRegister()

    

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
                        minLength="4"
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
