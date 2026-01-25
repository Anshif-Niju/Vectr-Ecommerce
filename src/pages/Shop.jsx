import { useState, useEffect } from "react";
import api from "../service/api";
import ProductCard from "../components/Cards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Shop() {
    const [product, setProduct] = useState([]);
    const [selectCategory, setSelectCategory] = useState("all");

    useEffect(() => {
        const fetchProduct = async () => {
            let url = "/products";
            if (selectCategory !== "all") {
                url = `/products?category=${selectCategory}`;
            }
            const res = await api.get(url);
            setProduct(res.data);
        };

        fetchProduct();
    }, [selectCategory]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6 pt-[100px]">
                <h1 className="text-3xl font-bold text-center mb-8 ">
                    Shop <span className="text-purple-500">Devices</span>
                </h1>

                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {["All", "Laptop", "Phone", "Headset", "Earbud"].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectCategory(item.toLowerCase())}
                            className="px-5 py-2 rounded-full border transition bg-purple-600 text-white bg-white/5 text-white hover:bg-purple-600"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                    product.map((product) => {
                        return (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                smallDes={product.smallDes}
                                category={product.category}
                                rent={product.rent}
                                description={product.description}
                                title={product.name}
                                price={product.price}
                                img={product.img}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Shop;
