import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  ApiError,
  AppChildrenProps,
  CartContextValue,
  CartItemRecord,
  ProductRecord,
} from '../types/app';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import { addToCart, clearCartItems, getCart, removeFromCart } from '../service/cartService';

const defaultCartContext: CartContextValue = {
  cart: [],
  cartLength: 0,
  totalPrice: 0,
  delivery: 0,
  addProduct: async () => undefined,
  removeCart: async () => undefined,
  clearCart: async () => undefined,
  resetCart: () => undefined,
};

const CartContext = createContext<CartContextValue>(defaultCartContext);
const getApiErrorMessage = (error: ApiError, fallback: string) =>
  error.response?.data?.message || fallback;

export const CartProvider = ({ children }: AppChildrenProps) => {
  const [cart, setCart] = useState<CartItemRecord[]>([]);
  const { user, loading } = useUser();

  // ✅ FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) {
          setCart([]);
          return;
        }

        const cartItems = await getCart();
        setCart(cartItems);
      } catch (error) {
        console.error('Cart fetch error', error.response?.data || error.message);
        setCart([]);
      }
    };

    if (loading) return;
    fetchCart();
  }, [user, loading]);

  // ✅ ADD PRODUCT
  const addProduct = async (product: ProductRecord, qty = 1) => {
    if (!user) {
      toast.error('Please login');
      return;
    }

    try {
      const updatedCart = await addToCart({ productId: product._id || product.id, quantity: qty });

      setCart(updatedCart);
      toast.success(qty > 0 ? 'Added to cart' : 'Cart updated');
    } catch (error) {
      console.log(error);
      toast.error(getApiErrorMessage(error, 'Failed to update cart'));
    }
  };

  // ✅ REMOVE SINGLE ITEM
  const removeCart = async (cartId: string) => {
    try {
      const updatedCart = await removeFromCart(cartId);
      setCart(updatedCart);

      toast.success('Item removed');
    } catch (error) {
      console.log(error);
      toast.error(getApiErrorMessage(error, 'Failed to remove item'));
    }
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    try {
      await clearCartItems();
      setCart([]);

      toast.success('Cart cleared');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Error clearing cart'));
    }
  };

  const resetCart = () => {
    setCart([]);
  };

  // ✅ CART COUNT
  const cartLength = cart.length;

  // ✅ TOTAL PRICE
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + Number(item.product?.price ?? 0) * Number(item.quantity ?? 1);
    }, 0);
  }, [cart]);

  // ✅ DELIVERY
  const delivery = useMemo(
    () => (cart.length === 0 ? 0 : totalPrice > 100000 ? 0 : 199),
    [cart.length, totalPrice],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLength,
        totalPrice,
        delivery,
        addProduct,
        removeCart,
        clearCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => useContext(CartContext);
