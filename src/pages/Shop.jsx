import { useState, useEffect } from 'react';
import api from '../service/api';
import ProductCard from '../components/ShopCards';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Shop() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [selectCategory, setSelectCategory] = useState('all');

  useEffect(() => {
    const fetchProduct = async () => {
      let url = '/products';
      if (selectCategory !== 'all') {
        url = `/products?category=${selectCategory}`;
      }
      const res = await api.get(url);
      setProduct(res.data);
    };

    fetchProduct();
  }, [selectCategory]);

  const filterProduct = product.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F1FAEE] px-6 pt-32 pb-24">
        <div className="text-center mb-12">
          <span className="text-[#457b9d] font-bold tracking-widest uppercase text-xs mb-3 block">
            Premium Gear
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#1D3557] tracking-tight">
            Shop <span className="text-[#457b9d]">Devices</span>
          </h1>
          <div className="w-24 h-1.5 bg-[#1D3557]/10 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between my-6 gap-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 border rounded-lg shadow"
          />

          <div className="flex flex-wrap gap-3">
            {['All', 'Acer', 'Dell', 'Lenovo', 'Asus'].map((item, index) => {
              const isSelected = selectCategory === item.toLowerCase();
              return (
                <button
                  key={index}
                  onClick={() => setSelectCategory(item.toLowerCase())}
                  className={`
            px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border
            ${
              isSelected
                ? 'bg-[#1D3557] text-white border-[#1D3557] shadow-lg shadow-blue-900/20 scale-105'
                : 'bg-white text-slate-500 border-slate-200 hover:border-[#457b9d] hover:text-[#457b9d] hover:-translate-y-0.5'
            }
          `}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filterProduct.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
