import {Link} from "react-router-dom" 

function HomeCard({product}) {
    
    const {id,img,name,smallDes,price}=product
     
    return (
        <div
            key={id}
            className={`
        group rounded-3xl bg-gradient-to-b from-white/10 to-white/5
        p-6 backdrop-blur-xl hover:scale-[1.03] transition duration-300
        ${id >= 5 ? "hidden md:block" : "block"}
      `}
        >
            <img loading="lazy" className="w-full h-48 rounded-2xl bg-black/40 mb-4" src={img}></img>
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-gray-400 text-sm mb-4">{smallDes}</p>
            <div className="flex justify-between items-center">
                <span className="text-indigo-400 font-semibold">{price}</span>
                <button className="px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 transition">
                    <Link to={`/itemDetail/${id}`}>View</Link>
                </button>
            </div>
        </div>
    );
}

export default HomeCard
