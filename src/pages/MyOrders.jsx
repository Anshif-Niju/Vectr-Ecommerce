import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import api from '../service/api';

function MyOrders() {
  const [product, setProduct] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/Bookings?userId=${user.id}`);
        console.log(res);
        console.log(res.data);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [user]);

const calculateOrderTotal = (products) => {
    return products.reduce((total, item) => total + (item.price * item.size), 0);
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F1FAEE] px-6 pt-32 pb-24">
        <div className="text-center mb-14">
          <p className="text-sm tracking-widest text-[#457b9d] font-semibold">
            ORDER HISTORY
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1D3557] mt-2">
            My Orders
          </h1>
          <div className="w-24 h-1.5 bg-[#1D3557]/10 mx-auto mt-6 rounded-full"></div>
        </div>

        {product.length > 0 ? (
          product.map((item) => (
            <div key={item.id} className="max-w-6xl mt-5 mx-auto space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">item</p>
                    <p className="font-semibold text-[#1D3557]">{item.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-semibold text-[#1D3557]">
                      {item.payment}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-[#457b9d]">{calculateOrderTotal(item.product)}</p>
                  </div>
                </div>

                {
                item.product.map((product) => (
                  <>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-6">
                      <img
                        src={product.img}
                        alt="product"
                        className="w-24 h-20 object-contain rounded-xl bg-gray-50"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#1D3557]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                         Quantity: {product.size}
                        </p>
                      </div>

                      <p className="font-bold text-[#1D3557]">{product.price*product.size}</p>
                    </div>
                  </div>
                  </>
                ))
                }



              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh] w-full lg:col-span-4">
            <h1 className="text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight">
              No Buy Items
            </h1>

            <p className="text-gray-500 text-lg mt-2 max-w-xl">
              You haven’t Buy any products yet. Start buy your devices!
            </p>

            <Link
              to="/shop"
              className="mt-4 px-8 py-3 bg-[#1D3557] text-white rounded-full font-bold hover:bg-[#457b9d] transition"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;
