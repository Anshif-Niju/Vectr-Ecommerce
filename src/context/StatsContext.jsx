import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    users: [],
    product: [],
    orders: [],
    ordersProduct: [],
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, productRes, ordersRes] =
          await Promise.all([
            api.get('/users'),
            api.get('/products'),
            api.get('/Bookings'),
          ]);
        const usersData = userRes.data;
        const productData = productRes.data;
        const bookingData = ordersRes.data;

       const orderProduct=bookingData.flatMap((item)=>item.product)


        const revenue =orderProduct.reduce(
          (total, item) => total + item.price * item.size || 0,
          0,
        );

        setStats({
          users: usersData,
          product: productData,
          orders: bookingData,
          totalUsers: usersData.length,
          totalRevenue: revenue,
          totalOrders: bookingData.length,
          totalProducts: productData.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <StatsContext.Provider value={{ stats }}>{children}</StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
