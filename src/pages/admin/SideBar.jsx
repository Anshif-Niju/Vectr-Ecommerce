import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Main from './Main';
function Dashboard() {
  const navigate = useNavigate();

  const { logout } = useUser();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 relative left-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-6 
          transform transition-transform duration-300 z-50
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-4  ">
          <Link to="/main" className="block hover:text-cyan-400">
            Dashboard
          </Link>
          <Link to="/admin/userlist" className="block hover:text-cyan-400">
            Users
          </Link>
          <Link to="" className="block hover:text-cyan-400">
            Orders
          </Link>
          <Link to="" className="block hover:text-cyan-400">
            Products
          </Link>

          <button
            onClick={handleLogout}
            className="bg-cyan-500 absolute bottom-5 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      <Main />
    </div>
  );
}

export default Dashboard;
