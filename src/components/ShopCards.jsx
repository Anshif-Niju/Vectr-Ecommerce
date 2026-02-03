import { useState } from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';
import AddCart from './AddCartButton';

function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState('');

  return (
    <div className="group bg-white border border-slate-100 rounded-[1.5rem] p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(69,123,157,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link
        to={`/itemDetail/${product.id}`}
        key={product.id}
        className="block relative overflow-hidden rounded-2xl flex-1"
      >
        <div className="w-full h-48 bg-slate-50 overflow-hidden rounded-2xl">
          <img
            loading="lazy"
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="mt-4 space-y-1">
          <h2 className="text-lg font-black text-[#1D3557] leading-tight group-hover:text-[#457b9d] transition-colors">
            {product.name}
          </h2>
          <p className="text-slate-500 text-sm font-medium line-clamp-2">
            {product.smallDes}
          </p>
          <p className="text-[#457b9d] font-black text-2xl pt-2">
            ₹{product.price}
          </p>
        </div>
      </Link>
      {message && (
        <p className="text-xs font-bold text-red-500 bg-red-50 px-2 rounded ml-auto">
          {message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-4 p-2 bg-slate-50 rounded-xl w-full">
        <button
          onClick={() => {
            if (qty === 1) {
              setMessage('Min Reached');
              return;
            }
            setMessage('');
            setQty((prev) => prev - 1);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#1D3557] hover:bg-[#1D3557] hover:text-white transition-colors shadow-sm font-bold"
        >
          -
        </button>

        <span className="text-lg font-bold text-[#1D3557] min-w-[20px] text-center">
          {qty}
        </span>

        <button
          onClick={() => {
            if (qty === 10) {
              setMessage('Max limit: 10');
              return;
            }
            setMessage('');
            setQty((prev) => prev + 1);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#1D3557] hover:bg-[#457b9d] hover:text-white transition-colors shadow-sm font-bold"
        >
          +
        </button>

        <WishlistButton product={product} />
      </div>

      <div className="flex gap-3 mt-5 w-full">
        <AddCart product={product} qty={qty} />
        
      </div>
    </div>
  );
}

export default ProductCard;
