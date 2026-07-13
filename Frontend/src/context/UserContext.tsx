import { createContext, useContext, useState, useEffect } from 'react';
import type { AppChildrenProps, UserContextValue, UserRecord } from '../types/app';
import { clearAuthToken, getCurrentUser } from '../service/sessionService';

const defaultUserContext: UserContextValue = {
  user: null,
  setUser: () => undefined,
  logout: () => undefined,
  loading: true,
};

const UserContext = createContext<UserContextValue>(defaultUserContext);

export const UserProvider = ({ children }: AppChildrenProps) => {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);
        setUser(currentUser);
      } catch (error) {
        console.log('Auth failed', error);
        clearAuthToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => useContext(UserContext);
