import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {getHomeProduct} from "../service/authService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feedback from "../components/Feedback";
import HomeCard from "../components/HomeCard";

function Home() {
   
const [product,setProduct]=useState([])
 
    useEffect(()=>{

    const fetchProducts=async ()=>{   

    const res=await getHomeProduct("limit=6")
    setProduct(res) 

    }
    fetchProducts()


    },[])



    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

                <section className="relative  px-6 py-24 max-w-7xl mx-auto">
                    <div className="absolute  inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#0f172a,_transparent_60%)]"></div>
                    <div className="grid  md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fadeIn">
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                                Smart Tech.
                                <span className="block text-indigo-400">Buy or Rent.</span>
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Experience the future of electronics. Buy premium devices or rent them when you need —
                                flexible, affordable, and fast.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition shadow-lg">
                                    <Link to="/shop">Shop</Link>
                                </button>
                                <button className="px-6 py-3 rounded-xl border border-gray-600 hover:border-indigo-400 transition">
                                    Rent Tech
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
                            <img
                               loading="lazy"
                                src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=1000&q=80&auto=format&fit=crop"
                                alt="electronics"
                                className="relative rounded-3xl shadow-2xl animate-float will-change-transform"
                            />
                        </div>
                    </div>
                </section>


                <section className="py-12 border-t border-white/10 bg-black/40 backdrop-blur">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
                        {["Buy New Devices", "Rent Premium Tech", "Fast Delivery", "Secure Payments"].map((item) => (
                            <div key={item} className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition text-center">
                                <p className="font-semibold">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="py-24 max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-12 text-center">Trending Electronics</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

                        {product.map((product) => (

                            <HomeCard key={product.id} product={product}/>
                        ))}
                    </div>
                </section>

                {/* RENTING CTA */}

                <section className="relative py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-4xl font-bold mb-4">Not Ready to Buy?</h2>
                        <p className="text-white/80 mb-8">
                            Rent high-end electronics monthly. Upgrade anytime. Zero hassle.
                        </p>
                        <button className="px-8 py-4 bg-black/80 rounded-xl hover:bg-black transition">
                            Explore Rentals
                        </button>
                    </div>
                </section>

                {/* FOOTER */}

                {/* ANIMATIONS */}

                <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
                <Feedback />
                <Footer />
            </div>
        </>
    );
}

export default Home;
