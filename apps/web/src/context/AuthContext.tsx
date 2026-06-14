import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { email: string; role: string; name: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; role: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to verify existing session (e.g., by making a request to a protected endpoint)
    const verifySession = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/protected', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Get CSRF token first
      const csrfRes = await fetch('http://localhost:3001/api/csrf-token', { credentials: 'include' });
      if (!csrfRes.ok) throw new Error('Failed to get CSRF token');
      const { token: csrfToken } = await csrfRes.json();

      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Login failed');
      }
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
