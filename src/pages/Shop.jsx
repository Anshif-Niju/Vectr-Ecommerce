import { useState, useEffect } from "react";
import { Link,useNavigate,useParams} from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/Cards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Shop() {


    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await api.get("/products");
            setProduct(res.data);
        };

        fetchProduct();
    }, []);

    return (
      <>
      <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6 pt-[100px]">
            <h1 className="text-3xl font-bold text-center mb-8 ">
                Shop <span className="text-purple-500">Devices</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {product.map((product) => {
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
        <Footer/>
        </>
    );
}

export default Shop;
