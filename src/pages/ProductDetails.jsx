import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../service/api';
import WishlistButton from '../components/WishlistButton';
import AddCart from '../components/AddCartButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleItem = async () => {
      try {
        const res = await api.get(`products/${id}`);
        if (res.data.length == 0) {
          setMsg('Not user found');
        }
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1FAEE] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#457b9d] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-[#1D3557] text-xl font-bold animate-pulse">
          Loading Product...
        </div>
        <button
          className="mt-6 text-[#457b9d] font-bold hover:underline"
          onClick={() => {
            navigate('/shop');
          }}
        >
          ← Go back to Shop
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F1FAEE] flex flex-col items-center justify-center text-[#1D3557]">
        <h2 className="text-3xl font-black mb-4">Product not found 😕</h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-[#457b9d] font-bold underline hover:text-[#1D3557] transition-colors"
        >
          ← Go back to Shop
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F1FAEE] text-slate-800 p-6 pt-24 relative overflow-x-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#457b9d]/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-6xl mx-auto flex justify-between mb-8 relative z-10">
          <button
            onClick={() => {
              navigate('/shop');
            }}
            className="text-[#457b9d] font-bold hover:text-[#1D3557] transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Shop
          </button>
          <button
            onClick={() => {
              navigate('/home');
            }}
            className="text-[#457b9d] font-bold hover:text-[#1D3557] transition-colors flex items-center gap-2"
          >
            Back to Home <span>→</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative group">
            <div className="absolute inset-0 bg-[#457b9d]/5 rounded-[2.5rem] transform rotate-1 group-hover:rotate-2 transition-transform -z-10"></div>
            <img
              loading="lazy"
              src={product.img}
              alt={product.name}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-[2rem]"
            />
          </div>

          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-[#457b9d]/10 text-[#457b9d] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                {product.category || 'Electronics'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              {product.description}
            </p>

            <h2 className="text-4xl font-black text-[#457b9d]">
              {product.price}
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1D3557] uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center gap-4 bg-white border border-slate-200 w-fit p-2 rounded-xl shadow-sm">
                <button
                  className="w-10 h-10 rounded-lg bg-slate-100 text-[#1D3557] text-xl font-bold hover:bg-[#1D3557] hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (qty == 1) {
                      setMsg('Minimum size reached');
                      return;
                    }
                    setMsg('');
                    setQty((prev) => prev - 1);
                  }}
                >
                  -
                </button>

                <span className="text-xl font-bold text-[#1D3557] min-w-[30px] text-center">
                  {qty}
                </span>

                <button
                  className="w-10 h-10 rounded-lg bg-slate-100 text-[#1D3557] text-xl font-bold hover:bg-[#457b9d] hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (qty == 10) {
                      setMsg('Maximum size reached');
                      return;
                    }
                    setMsg('');
                    setQty((prev) => prev + 1);
                  }}
                >
                  +
                </button>
                <WishlistButton product={product} />
              </div>
              {msg && (
                <p className="text-red-500 text-sm font-bold bg-red-50 w-fit px-2 py-1 rounded">
                  {msg}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
              <AddCart product={product} qty={qty} />
              
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mt-8">
              <h3 className="text-lg font-bold text-[#1D3557] mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#457b9d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  ></path>
                </svg>
                Specifications
              </h3>
              <ul className="text-slate-600 space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#457b9d]"></span>
                  Processor: Apple M4 Chip
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#457b9d]"></span>
                  RAM: 16GB
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#457b9d]"></span>
                  Storage: 512GB SSD
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#457b9d]"></span>
                  Display: 13.6″ Retina
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#457b9d]"></span>
                  Battery: Up to 18 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
