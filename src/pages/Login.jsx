import { Link } from "react-router-dom";
import {useLogin} from "../hook/useLogin";

function Login() {
    
    const {formData,handleChange,handleSubmit,error}=useLogin()

    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
                <p className="text-center text-gray-500 mt-2">Login to your account</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
