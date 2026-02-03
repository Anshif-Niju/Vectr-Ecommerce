import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutCard from '../components/CheckoutCard';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import api from '../service/api';

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    address: '',
  });
  const [payment, setPayment] = useState(null);
  const { cart,setCart, totalPrice } = useCart();
  const { user } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    const emptyField = Object.values(formData).some(
      (value) => value.trim() == '',
    );

    if (emptyField) {
      toast.error('Fill all the fields');
      return;
    }
    if (payment == null) {
      toast.error('Select payment Option');
      return;
    }
    if (cart.length == 0) {
      toast.error('Cart is empty');
      return;
    }
    try {
      const cleanCart = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        img: item.product.img,
        size: item.size,
      }));
      const res = await api.post('/Bookings', {
        userId: user.id,
        orderDate: new Date().toISOString(),
        product: cleanCart,
        address: formData,
        payment: payment,
        status: 'Delivery Soon',
      });

      toast.success('Order Placed Succesfully');
      setCart([])
      navigate('/myorders');
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order');
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F1FAEE] px-6 pt-32 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#1D3557]">
            Checkout
          </h1>
          <div className="w-24 h-1.5 bg-[#1D3557]/10 mx-auto mt-6 rounded-full"></div>
        </div>

        <CheckoutCard />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <form action="">
              <h2 className="text-2xl font-bold text-[#1D3557] mb-6">
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border px-4 py-3 rounded-lg w-full"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="border px-4 py-3 rounded-lg w-full"
                />

                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border px-4 py-3 rounded-lg w-full"
                />

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border px-4 py-3 rounded-lg w-full"
                />
              </div>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="border px-4 py-3 rounded-lg w-full mt-6"
                rows="4"
              ></textarea>
            </form>
          </div>

          <div className="bg-white rounded-2xl w-full">
            <h2 className="text-2xl mt-3 text-center font-bold text-[#1D3557] mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">
              {/* Cash on Delivery */}
              <label className="flex items-center justify-between border p-5 rounded-xl cursor-pointer hover:border-[#457B9D] transition">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    onClick={() => {
                      setPayment('COD');
                    }}
                    name="payment"
                    className="w-5 h-5 accent-[#1D3557]"
                  />
                  <div>
                    <p className="font-semibold text-[#1D3557]">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-gray-500">
                      Pay when product arrives
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">COD</span>
              </label>

              {/* CARD PAYMENT */}
              <div>
                <label className="flex items-center justify-between border p-5 rounded-xl cursor-pointer hover:border-[#457B9D] transition">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      onClick={() => setPayment('CARD')}
                      name="payment"
                      className="peer/card w-5 h-5 accent-[#1D3557]"
                    />
                    <div>
                      <p className="font-semibold text-[#1D3557]">
                        Credit / Debit Card
                      </p>
                      <p className="text-sm text-gray-500">
                        Visa, MasterCard, RuPay
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">CARD</span>
                </label>
              </div>

              {/* UPI PAYMENT */}
              <div>
                <label className="flex items-center justify-between border p-5 rounded-xl cursor-pointer hover:border-[#457B9D] transition">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      onClick={() => setPayment('UPI')}
                      name="payment"
                      className="peer/upi w-5 h-5 accent-[#1D3557]"
                    />
                    <div>
                      <p className="font-semibold text-[#1D3557]">
                        UPI Payment
                      </p>
                      <p className="text-sm text-gray-500">
                        Google Pay, PhonePe, Paytm
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">UPI</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3  bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#1D3557] mb-6">
              Order Summary
            </h2>

            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p className="text-[#457b9d]">{totalPrice}</p>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-[#1D3557] hover:bg-[#457b9d] text-white py-3 rounded-xl font-bold transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
