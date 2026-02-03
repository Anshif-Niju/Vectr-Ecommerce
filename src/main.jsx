import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { StatsProvider } from './context/StatsContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <UserProvider>
    <CartProvider>
      <StatsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StatsProvider>
    </CartProvider>
  </UserProvider>,
  // </StrictMode>,
);
