import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";

function ProductDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(0);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleItem = async () => {
            try {
                const res = await api.get(`products/${id}`);
                if (res.data.length) {
                    setMessage("Not user found");
                }
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        };
        fetchSingleItem();
    }, [id]);


    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading Product...</div>
                <button className="mt-4 text-purple-400 underline absolute top-3 left-3" onClick={()=>{navigate("/shop")}}>  ← Go back to Shop</button>
            </div>
        );
    }

    // 4. Show Error if product not found
    if (!product) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl">Product not found 😕</h2>
                <button onClick={() => navigate("/shop")} className=" absolute top-3 left-3 mt-4 text-purple-400 underline">
                    ← Go back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 text-white p-6">
            {/* Back Button */}
            <button
                onClick={() => {
                    navigate("/shop");
                }}
                className="mb-6 text-purple-400 hover:underline"
            >
                ← Back to Shop
            </button>
            <button
                onClick={() => {
                    navigate("/home");
                }}
                className="mb-6 absolute right-5 text-purple-400 hover:underline"
            >
                ← Back to Home
            </button>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="bg-slate-800/40 p-6 rounded-2xl shadow-xl">
                    <img loading="lazy" src={product.img} alt="MacBook" className="w-full  rounded-xl object-cover" />
                </div>

                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-purple-400">{product.name}</h1>

                    <p className="text-gray-300">{product.description}</p>

                    <h2 className="text-2xl font-bold text-green-400">{product.price}</h2>

                    <div className="flex items-center gap-3">
                        
                        <button className="bg-slate-700 px-3 py-1 rounded text-xl" 
                        onClick={(e)=>{
                            e.stopPropagation();
                            if(qty==0){
                             setMsg("Minimum size reached")
                             return
                            }
                            setMsg("")
                            setQty((prev)=>prev-1)
                        }}
                        >-</button>
                        <span className="text-lg font-bold">{qty}</span>
                        <button className="bg-slate-700 px-3 py-1 rounded text-xl"
                        onClick={(e)=>{
                             e.stopPropagation();
                            if(qty==10){
                             setMsg("Maximum size reached")
                             return
                            }
                            setMsg("")
                            setQty((prev)=>prev+1)
                        }}
                        >+</button>
                        <p className="text-red-500 text-sm mt-2">{msg}</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold">
                            Add to Cart
                        </button>

                        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold">
                            Buy Now
                        </button>
                      
                        <button className={(product.rent==null)?"bg-gray-600 cursor-not-allowed px-6 py-3 rounded-xl font-semibold":"bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"}>
                            {
                                (product.rent==null)?"No rent available":"Rent Now"

                            }
                        </button>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-xl mt-6">
                        <h3 className="text-lg font-semibold mb-2 ">Category</h3>
                        <h2 className="text-sm font-semibold mb-2 uppercase">#{product.category}</h2>
                        <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                        <ul className="text-gray-300 space-y-1">
                            <li>• Processor: Apple M4 Chip</li>
                            <li>• RAM: 16GB</li>
                            <li>• Storage: 512GB SSD</li>
                            <li>• Display: 13.6″ Retina</li>
                            <li>• Battery: Up to 18 hours</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
