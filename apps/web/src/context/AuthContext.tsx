import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string | null;
  role: string;
  isActive: boolean;
  hostedDomain?: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  loginWithGoogle: (redirectUri?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setAuthenticatedUser: (user: AuthUser | null) => void;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'include'
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // Handle static hostings or offline backend gracefully
        setUser(null);
        return;
      }

      const data = await res.json();
      if (data?.user && data.user.isActive) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      // Backend offline or unreachable
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const loginWithGoogle = useCallback(async (customRedirectUri?: string) => {
    try {
      setAuthError(null);
      const redirectUri = customRedirectUri || `${window.location.origin}/auth/callback`;
      const urlRes = await fetch(
        `/api/auth/google/url?redirectUri=${encodeURIComponent(redirectUri)}`,
        {
          headers: { 'Accept': 'application/json' },
          credentials: 'include'
        }
      );

      if (!urlRes.ok) {
        const errorData = await urlRes.json().catch(() => ({}));
        throw new Error(errorData.error || 'Falha ao iniciar autenticação com o Google');
      }

      const { url } = await urlRes.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao conectar ao serviço de autenticação');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch {
      // Ignore network errors during logout
    } finally {
      setUser(null);
    }
  }, []);

  const setAuthenticatedUser = useCallback((newUser: AuthUser | null) => {
    setUser(newUser);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user && user.isActive),
    isLoading,
    authError,
    loginWithGoogle,
    logout,
    clearError,
    setAuthenticatedUser,
    checkSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um <AuthProvider>');
  }
  return context;
}
