import { useCart } from '../context/CartContext';

function CheckoutCard() {

  const { cart,removeCart } = useCart();


  return (
<>
    {
      (cart)?cart.map((item)=>{

        return (
    <div key={item.id} className="lg:col-span-2 space-y-6">
      <div className="flex  gap-6 bg-white border border-slate-200 p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
        <img
          src={item.product.img}
          className="w-32 h-32 rounded-3xl object-cover bg-slate-100"
          loading="lazy"
        />

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-[#1D3557]">{item.product.name}</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">
            {item.product.smallDes}
          </p>

              <div className="flex w-full justify-between  items-center gap-6 mt-4">
            <span className="text-[#457b9d] font-black text-xl">
              {item.product.price}
            </span>

            <span className="text-[#457b9d] font-black text-xl">Quantity: {item.size}</span>
            <span className="text-[#457b9d]   font-black text-xl">Total: {item.product.price*item.size}</span>
          </div>
        </div>
        <button
          onClick={()=>{
            removeCart(item.id) 
          }}
          className="self-start text-slate-300 hover:text-red-500 p-2 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="h-px bg-slate-200 my-4"></div>
    </div>
    )
    }):<p className="text-slate-500">Your cart is empty.</p>
  }
  </>

  );
}

export default CheckoutCard;
