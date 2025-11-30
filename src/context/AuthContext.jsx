import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // nullo é por que não logou /tratar

  const login = (usuario) => setUser(usuario); // seta o usuário ao logar
  const logout = () => setUser(null);          // remove o usuário ao deslogar

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
