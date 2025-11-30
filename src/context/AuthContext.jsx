import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    nome: "Teste Usuário",
    email: "teste@email.com",
    senha: "1234",
    telefone: "44999999999",
  }); // já logado automaticamente
  //  const [user, setUser] = useState(null); // real 


  const login = (usuario) => setUser(usuario);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
