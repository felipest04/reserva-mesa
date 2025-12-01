import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'reservamesa_user';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Erro ao ler dados do localStorage:", error);
            return null;
        }
    });
    useEffect(() => {
        if (user) {
            // Se o usuário existir, armazena no localStorage
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            // Se o usuário for nulo (logout)
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    // Função de logout
    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        userId: user ? user.id : null
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};