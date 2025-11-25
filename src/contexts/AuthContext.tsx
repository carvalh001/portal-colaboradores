import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/mock/users";

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (usernameOrEmail: string, senha: string) => boolean;
  loginAsPreset: (userId: string) => void;
  logout: () => void;
  register: (userData: Omit<User, "id" | "papel" | "status">) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const foundUser = users.find((u) => u.id === storedUserId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [users]);

  const login = (usernameOrEmail: string, senha: string): boolean => {
    const foundUser = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.senha === senha
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("userId", foundUser.id);
      return true;
    }
    return false;
  };

  const loginAsPreset = (userId: string) => {
    const foundUser = users.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("userId", userId);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  const register = (userData: Omit<User, "id" | "papel" | "status">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      papel: "COLABORADOR",
      status: "ATIVO",
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem("userId", newUser.id);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, papel: newRole } : u))
    );
    if (user?.id === userId) {
      setUser((prev) => (prev ? { ...prev, papel: newRole } : null));
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.papel === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.papel) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        loginAsPreset,
        logout,
        register,
        updateUserRole,
        isAuthenticated: !!user,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
