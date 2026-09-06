import { createContext, useContext, type ReactNode } from 'react';

interface Session {
  access_token: string;
}

interface User {
  id: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, session: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={{ user: null, session: null, loading: false }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
