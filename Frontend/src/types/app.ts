import type { Dispatch, ReactNode, SetStateAction } from 'react';

export interface BaseEntity {
  _id?: string;
  id?: string;
  [key: string]: any;
}

export interface UserRecord extends BaseEntity {
  username?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export interface ProductRecord extends BaseEntity {
  name?: string;
  price?: number | string;
  img?: string;
  category?: string;
  isActive?: boolean;
}

export interface OrderProductRecord extends BaseEntity {
  productId?: ProductRecord | null;
  quantity?: number;
}

export interface OrderRecord extends BaseEntity {
  userId?: UserRecord | null;
  products?: OrderProductRecord[];
  totalPrice?: number;
  status?: string;
  orderDate?: string;
  paymentMethod?: string;
  address?: Record<string, any>;
}

export interface CartItemRecord extends BaseEntity {
  product?: ProductRecord | null;
  productId?: ProductRecord | string | null;
  quantity?: number;
}

export interface WishlistItemRecord extends BaseEntity {
  product?: ProductRecord | null;
  productId?: ProductRecord | string | null;
}

export interface StatsState {
  users: UserRecord[];
  product: ProductRecord[];
  orders: OrderRecord[];
  ordersProduct?: BaseEntity[];
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export interface UserContextValue {
  user: UserRecord | null;
  setUser: Dispatch<SetStateAction<UserRecord | null>>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextValue {
  cart: CartItemRecord[];
  cartLength: number;
  totalPrice: number;
  delivery: number;
  addProduct: (product: ProductRecord, qty?: number) => Promise<void>;
  removeCart: (cartId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  resetCart: () => void;
}

export interface WishlistContextValue {
  wishlist: WishlistItemRecord[];
  toggleWishlist: (product: ProductRecord) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistLength: number;
}

export interface StatsContextValue {
  stats: StatsState;
  toggleActive: (userId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<OrderRecord>;
  setStats: Dispatch<SetStateAction<StatsState>>;
}

export interface AppChildrenProps {
  children: ReactNode;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
