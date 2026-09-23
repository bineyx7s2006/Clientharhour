import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeConfig, User } from './types';
import { defaultTheme } from './data';

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  applyTheme: (theme: ThemeConfig) => void;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  tmdbKey: string;
  setTmdbKey: (key: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  applyTheme: () => {},
});

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  tmdbKey: '',
  setTmdbKey: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);

  const applyTheme = useCallback((t: ThemeConfig) => {
    const root = document.documentElement;
    root.style.setProperty('--harbor-bg', t.bg);
    root.style.setProperty('--harbor-surface', t.surface);
    root.style.setProperty('--harbor-surface-2', t.surface2);
    root.style.setProperty('--harbor-border', t.border);
    root.style.setProperty('--harbor-accent', t.accent);
    root.style.setProperty('--harbor-accent-hover', t.accentHover);
    root.style.setProperty('--harbor-text', t.text);
    root.style.setProperty('--harbor-text-muted', t.textMuted);
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
  }, []);

  const setTheme = useCallback((t: ThemeConfig) => {
    setThemeState(t);
    applyTheme(t);
  }, [applyTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tmdbKey, setTmdbKey] = useState('');

  const login = useCallback((username: string, _password: string) => {
    setUser({
      id: 'u1',
      username,
      email: `${username}@harbor.app`,
      avatar: undefined,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, tmdbKey, setTmdbKey }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);
