import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import vectrLogo from '../assets/img/Vectr.png';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const { cartLength } = useCart();
  const [open, setOpen] = useState(false);
  const [profileOpen, setprofileOpen] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'));

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', {
      replace: true,
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      <nav className="mx-auto mw-full">
        <div className="flex items-center justify-between  bg-white backdrop-blur-md border border-white/40 shadow-lg px-6 py-3 transition-all duration-300">
          <div className="flex items-center gap-2">
            <NavLink
              to="/home"
              onClick={scrollTop}
              className="flex items-center gap-2"
            >
              <img
                src={vectrLogo}
                alt="VECTR"
                className="h-[60px] w-full "
                loading="lazy"
              />

              <span className="text-xl font-black tracking-wide text-[#1D3557]"></span>
            </NavLink>
          </div>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <li className="hover:text-[#457b9d] transition-colors relative group">
              <NavLink
                to="/home"
                onClick={scrollTop}
                className={({ isActive }) =>
                  `relative group transition-colors ${
                    isActive
                      ? 'text-[#457b9d] font-bold'
                      : 'text-slate-500 hover:text-[#457b9d]'
                  }`
                }
              >
                Home
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#457b9d] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#457b9d] transition-colors relative group">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative group transition-colors ${
                    isActive
                      ? 'text-[#457b9d] font-bold'
                      : 'text-slate-500 hover:text-[#457b9d]'
                  }`
                }
              >
                Shop
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#457b9d] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#457b9d] transition-colors relative group">
              <NavLink
                to="/myorders"
                className={({ isActive }) =>
                  `relative group transition-colors ${
                    isActive
                      ? 'text-[#457b9d] font-bold'
                      : 'text-slate-500 hover:text-[#457b9d]'
                  }`
                }
              >
                My Orders
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#457b9d] transition-all group-hover:w-full"></span>
            </li>
            <li className="hover:text-[#457b9d] transition-colors relative group">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `relative group transition-colors ${
                    isActive
                      ? 'text-[#457b9d] font-bold'
                      : 'text-slate-500 hover:text-[#457b9d]'
                  }`
                }
              >
                Support
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#457b9d] transition-all group-hover:w-full"></span>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
            <NavLink
              to="/wishlist"
              className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center"
            >
              <div className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center">
                <FaRegHeart />
              </div>
              {/* <span className="absolute top-[-4px] right-[-5px] h-5 w-5 rounded-full bg-[#1D3557] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                0
              </span> */}
            </NavLink>
            </div>

            <div className="relative group cursor-pointer">
              <NavLink to="/cart">
                <div className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#1D3557] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {cartLength}
                </span>
              </NavLink>
            </div>

            <div className="relative flex items-center gap-2">
              <p className="hidden lg:block text-[#1D3557] text-sm font-bold tracking-tight">
                {user ? user.name.split(' ')[0] : 'Guest'}
              </p>

              {user?.img ? (
                <img
                  loading="lazy"
                  src={user.img}
                  alt="user"
                  onClick={() => setprofileOpen(!profileOpen)}
                  className="h-10 w-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:border-[#457b9d] transition-colors object-cover"
                />
              ) : (
                <div
                  onClick={() => setprofileOpen(!profileOpen)}
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-[#457b9d] to-[#1D3557] border-2 border-white shadow-md cursor-pointer flex items-center justify-center text-white font-bold text-sm"
                >
                  {user?.name?.slice(0, 2).toUpperCase() || 'G'}
                </div>
              )}

              {profileOpen && (
                <div className="absolute right-0 top-[55px] bg-white border border-slate-100 rounded-2xl shadow-xl w-48 p-2 animate-slideDown overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 mb-2">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Account
                    </p>
                    <p className="text-sm font-bold text-[#1D3557] truncate">
                      {user?.name}
                    </p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition mt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden h-10 w-10 text-[#1D3557] rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-xl"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 mx-2 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl p-6 animate-slideDown">
            <ul className="flex flex-col gap-4 text-center">
              <li>
                <NavLink
                  to="/home"
                  onClick={scrollTop}
                  className="block text-lg font-medium hover:font-bold text-[#1D3557] py-2"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className="block text-lg font-medium hover:font-bold text-slate-600 py-2"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  className="block text-lg font-medium hover:font-bold text-slate-600 py-2"
                >
                  Whilist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  className="block text-lg font-medium hover:font-bold text-slate-600 py-2"
                >
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <style>{`
                .animate-slideDown {
                  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slideDown {
                  from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
    </header>
  );
}
