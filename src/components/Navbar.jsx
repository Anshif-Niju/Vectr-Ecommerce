import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [profileOpen, setprofileOpen] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setOpen(false);
    };

    const logOut = () => {
        sessionStorage.removeItem("user");
        navigate("/login");
    };
    console.log(user);

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3">
                    {/* LOGO */}
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-8 h-8 text-indigo-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="text-xl text-white font-bold tracking-wide">
                            VYOLO<span className="text-indigo-400"> Tech</span>
                        </span>
                    </div>

                    {/* DESKTOP LINKS */}
                    <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
                        <li className="hover:text-white transition">
                            <Link to="/home" onClick={scrollTop}>
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-white transition">
                            <Link to="/shop">Shop</Link>{" "}
                        </li>
                        <li className="hover:text-white transition">
                            <Link to="">Rent</Link>{" "}
                        </li>
                        <li className="hover:text-white transition">
                            <Link to="">Support</Link>{" "}
                        </li>
                    </ul>

                    {/* RIGHT ACTIONS */}

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-3">
                        {/* Rent Button */}
                        <button className="hidden sm:block px-4 py-2 text-white rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                            Rent Now
                        </button>

                        {/* Cart */}
                        <div className="relative">
                            <div className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center cursor-pointer">
                                🛒
                            </div>
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-500 text-[10px] flex items-center justify-center">
                                2
                            </span>
                        </div>

                        {/* USER PROFILE */}
                        <div className="relative flex items-center gap-2">
                            <p className="text-white text-sm font-semibold">{user ? user.name : "Guest"}</p>

                            {user?.img ? (
                                <img
                                    loading="lazy"
                                    src={user.img ? user.img : user.name[0]}
                                    alt="user"
                                    onClick={() => setprofileOpen(!profileOpen)}
                                    className="h-10 w-10 rounded-full border border-indigo-500 cursor-pointer"
                                />
                            ) : (
                                <div
                                    onClick={() => setprofileOpen(!profileOpen)}
                                    className="h-10 w-10 rounded-full bg-indigo-600 border border-indigo-400 cursor-pointer flex items-center justify-center text-white font-bold text-sm tracking-widest shadow-lg hover:bg-indigo-500 transition"
                                >
                                    {user?.name?.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                            {/* Dropdown */}
                            {profileOpen && (
                                <div className="absolute right-0 top-[50px]   bg-slate-900 border border-white/10 backdrop-blur-xl rounded-xl shadow-lg w-40 p-2 ">
                                    <Link className="block text-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded">
                                        My Orders
                                    </Link>
                                    <button
                                        className="w-full block px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded"
                                        onClick={logOut}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* HAMBURGER */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden h-10 w-10 text-white rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-xl"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {open && (
                    <div className="md:hidden mt-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 animate-slideDown">
                        <ul className="flex flex-col gap-4 text-gray-300">
                            <li className="hover:text-white transition">
                                <Link to="/home" onClick={scrollTop}>
                                    Home
                                </Link>
                            </li>
                            <li className="hover:text-white transition">
                                <Link to="">Shop</Link>{" "}
                            </li>
                            <li className="hover:text-white transition">
                                <Link to="">Rent</Link>{" "}
                            </li>
                            <li className="hover:text-white transition">
                                <Link to="">Support</Link>{" "}
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

            <style>{`
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </header>
    );
}
