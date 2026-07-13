import type { AppChildrenProps } from '../types/app';
import { UserProvider } from '../context/UserContext';
import { StatsProvider } from '../context/StatsContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

function AppProviders({ children }: AppChildrenProps) {
  return (
    <UserProvider>
      <StatsProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </StatsProvider>
    </UserProvider>
  );
}

export default AppProviders;
