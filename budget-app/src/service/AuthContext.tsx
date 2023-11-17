// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null; 
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [login, setLogin] = useState(() => {
    const storedLogin = localStorage.getItem('login');
    return storedLogin ? JSON.parse(storedLogin) : false;
  });

  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
    localStorage.setItem('login', JSON.stringify(login));
  }, [login]);

  return (
    <AuthContext.Provider value={{ login, setLogin, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
