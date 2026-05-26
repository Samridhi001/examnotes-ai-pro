import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser
} from "../services/authApi";
import { getApiErrorMessage } from "../services/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  async function refreshUser() {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
      setAuthError("");
    } catch (error) {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function register(payload) {
    setAuthError("");

    try {
      const response = await registerUser(payload);
      setUser(response.data.user);
      return response;
    } catch (error) {
      const message = getApiErrorMessage(error);
      setAuthError(message);
      throw new Error(message);
    }
  }

  async function login(payload) {
    setAuthError("");

    try {
      const response = await loginUser(payload);
      setUser(response.data.user);
      return response;
    } catch (error) {
      const message = getApiErrorMessage(error);
      setAuthError(message);
      throw new Error(message);
    }
  }

  async function logout() {
    await logoutUser();
    setUser(null);
    setAuthError("");
  }

  useEffect(() => {
    refreshUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      authError,
      register,
      login,
      logout,
      refreshUser
    }),
    [user, isAuthLoading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}