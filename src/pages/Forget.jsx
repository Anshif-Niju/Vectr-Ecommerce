import { Link } from "react-router-dom";
import { useForget } from "../hook/useForget";

function Forget() {

  const { formData, handleChange, handleSubmit, error } = useForget();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center"></h2>
        <p className="text-center text-gray-500 mt-1">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="pass"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.pass}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Re-enter Password</label>
            <input
              name="rePass"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.rePass}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between">
          <Link to="/login" className="font-medium text-black underline cursor-pointer">
            Login
          </Link>

          {error && <p className="text-red-500 mt-5">{error}</p>}

          <p className="text-sm text-center text-gray-500">
            Already have an account?
          </p>
        </div>

      </div>
    </div>
  );
}

export default Forget;
