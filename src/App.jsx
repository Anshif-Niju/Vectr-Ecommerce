import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Forget from "./pages/Forget";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

const PublicRoutes = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user ? <Navigate to="/home" /> : <Outlet />;
};

const PrivateRoutes = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Routes>
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
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
