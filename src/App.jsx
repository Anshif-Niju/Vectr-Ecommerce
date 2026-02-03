import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Forget from './pages/Forget';
import NotFound from './pages/NotFound';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import CheckOut from './pages/CheckOut';
import MyOrders from './pages/MyOrders';
import Dashboard from './pages/admin/SideBar';
import UserList from './pages/admin/UserList';
import ScrollTop from './components/ScrollTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;

  if (user.role !== 'admin') return <Navigate to="/home" />;
  return <Outlet />;
};

const PublicRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user) {
    if (user.role == 'admin') {
     return <Navigate to="/admin/dashboard" />;
    }
   return <Navigate to="/home" />;
  }
  return <Outlet />;
};

const PrivateRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
   return <Navigate to="/login" />;
  }
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
  return <Outlet />;
};

function App() {
  return (
    <>
      <ScrollTop />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/userlist" element={<UserList />} />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/itemDetail/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
