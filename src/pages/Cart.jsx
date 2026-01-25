import { useState, useEffect } from "react";

function Cart() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6 pt-[50px]">
            <h1 className="text-3xl text-center md:text-4xl font-bold mb-8">
                Your <span className="text-purple-500">Cart</span>
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                            className="w-28 h-28 rounded-xl object-cover"
                            loading="lazy"
                        />

                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Apple MacBook Air M4</h2>
                            <p className="text-gray-400 text-sm">Powerful laptop with M4 chip</p>

                            <div className="flex items-center gap-4 mt-3">
                                <span className="text-purple-400 font-bold">₹90,990</span>

                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                                    <button className="px-2 text-lg">-</button>
                                    <span className="font-semibold">1</span>
                                    <button className="px-2 text-lg">+</button>
                                </div>
                            </div>
                        </div>
                        <button className="text-red-400 hover:text-red-500">✕</button>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-4"></div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="flex justify-between text-gray-400 mb-2">
                        <span>Subtotal</span>
                        <span>₹90,990</span>
                    </div>

                    <div className="flex justify-between text-gray-400 mb-2">
                        <span>Delivery</span>
                        <span>₹199</span>
                    </div>

                    <div className="flex justify-between text-lg font-bold mt-4">
                        <span>Total</span>
                        <span className="text-purple-400">₹91,189</span>
                    </div>

                    <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
