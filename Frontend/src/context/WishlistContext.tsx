import { createContext, useContext, useState, useEffect } from 'react';
import type {
  AppChildrenProps,
  ProductRecord,
  WishlistContextValue,
  WishlistItemRecord,
} from '../types/app';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import { addToWishlist, getWishlist, removeFromWishlist } from '../service/wishlistService';

const defaultWishlistContext: WishlistContextValue = {
  wishlist: [],
  toggleWishlist: async () => undefined,
  isInWishlist: () => false,
  wishlistLength: 0,
};

const WishlistContext = createContext<WishlistContextValue>(defaultWishlistContext);

const normalizeWishlistItem = (item: WishlistItemRecord): WishlistItemRecord => {
  const product =
    item.product || (item.productId && typeof item.productId === 'object' ? item.productId : null);

  return { ...item, product };
};

const getWishlistProductId = (item: WishlistItemRecord): string | null => {
  if (item.product?._id) {
    return item.product._id;
  }

  if (typeof item.productId === 'string') {
    return item.productId;
  }

  return item.productId?._id || null;
};

export const WishlistProvider = ({ children }: AppChildrenProps) => {
  const [wishlist, setWishlist] = useState<WishlistItemRecord[]>([]);
  const { user } = useUser();

  // ✅ fetch wishlist (no userId needed)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!user) {
          setWishlist([]);
          return;
        }

        const items = await getWishlist();
        setWishlist(items.map(normalizeWishlistItem));
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      }
    };

    fetchWishlist();
  }, [user]);

  // ✅ check item
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => getWishlistProductId(item) === productId);
  };

  // ✅ toggle wishlist
  const toggleWishlist = async (product: ProductRecord) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    const productId = product._id || product.id;
    const exists = wishlist.find((item) => getWishlistProductId(item) === productId);

    try {
      if (exists) {
        // ❌ remove
        await removeFromWishlist(exists._id);

        setWishlist((prev) => prev.filter((item) => item._id !== exists._id));

        toast.success('Removed from wishlist');
      } else {
        // ✅ add
        const wishlistItem = await addToWishlist(productId);

        setWishlist((prev) => [...prev, normalizeWishlistItem(wishlistItem)]);

        toast.success('Added to wishlist');
      }
    } catch (err) {
      console.error('Error toggling wishlist', err);
    }
  };

  const wishlistLength = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, wishlistLength }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextValue => useContext(WishlistContext);
