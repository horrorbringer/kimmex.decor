"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ApiUser } from "./api-auth";
import { getCurrentUser, logout } from "./api-auth";
import { getToken, getUser, setAuthCookie, clearAuthCookies } from "@/lib/cookies";
import { setOnUnauthorized } from "./api-client";
import { reportError } from "./error-tracking";

type AuthContextType = {
  user: ApiUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (token: string, user: ApiUser) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOnUnauthorized(() => {
      setUser(null);
      setToken(null);
      clearAuthCookies();
    });

    const storedToken = getToken();
    const storedUser = getUser<ApiUser>();

    if (storedToken && storedUser) {
      setUser(storedUser);
      setToken(storedToken);

      getCurrentUser(storedToken)
        .then((currentUser) => {
          setUser(currentUser);
          setToken(storedToken);
          setAuthCookie(storedToken, currentUser);
        })
        .catch(() => {
          console.warn("Token validation failed, clearing auth");
          clearAuthCookies();
          setUser(null);
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const setAuth = (newToken: string, newUser: ApiUser) => {
    setUser(newUser);
    setToken(newToken);
    setAuthCookie(newToken, newUser);
  };

  const clearAuth = () => {
    const currentToken = token;
    if (currentToken) {
      logout(currentToken).catch(() => reportError("Logout API call failed", { component: "AuthContext", action: "clearAuth" }));
    }
    setUser(null);
    setToken(null);
    clearAuthCookies();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && !!token,
        setAuth,
        clearAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
