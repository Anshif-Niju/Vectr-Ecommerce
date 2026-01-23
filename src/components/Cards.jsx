import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ id,title, price, img ,smallDes,category,rent,description}) {
    const [qty, setQty] = useState(0);
    const [message, setMessage] = useState("");

    return (

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow hover:scale-105 transition">
            {/* Image */}
          <Link to={`/itemDetail/${id}`}
          key={id}
          >
            <img src={img} alt={title} className="w-full h-40 object-cover rounded-lg" />

            <h2 className="text-lg font-semibold mt-3">{title}</h2>
            <p className="text-gray-400 text-sm mb-4">{smallDes}</p>
            <p className="text-purple-400 font-bold text-xl mt-1">₹{price}</p>
            </Link>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-3">
                {/* Minus */}
                <button
                    onClick={() => {
                        if (qty === 0) {
                            setMessage("Min Reached");
                            return;
                        }
                        setMessage("");
                        setQty((prev) => prev - 1);
                    }}
                    className="px-2 py-1 bg-white/10 rounded hover:bg-purple-600"
                >
                    -
                </button>

                <span className="text-lg font-bold">{qty}</span>

                {/* Plus */}
                <button
                    onClick={() => {
                        if (qty === 10) {
                            setMessage("Max product limit is 10");
                            return;
                        }
                        setMessage("");
                        setQty((prev) => prev + 1);
                    }}
                    className="px-2 py-1 bg-white/10 rounded hover:bg-purple-600"
                >
                    +
                </button>

                {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
            </div>

            {/* Error Message */}

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-purple-600 py-1.5 rounded hover:bg-purple-700 text-sm">Add to Cart</button>
                <button className="px-3 py-1.5 border border-white/20 rounded hover:bg-white/10 text-sm">Buy</button>
            </div>
        </div>
    );
}

export default ProductCard;
