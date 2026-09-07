"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { api, setStoredToken } from "@/lib/api";
import type { RegisterForm, User } from "@/lib/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    form: RegisterForm,
  ) => Promise<{ user: User; verification_token: string; emailSent: boolean }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function unwrapUser(response: unknown): User {
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: User }).data;
  }
  return response as User;
}

function handleAuthError(error: unknown) {
  let message = "An unexpected error occurred";

  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED" || !error.response) {
      toast.error(
        "The server is waking up — this can take up to a minute on the first request. Please wait a moment, then try again.",
      );
      return;
    }

    const errorData = error.response.data;
    if (errorData && typeof errorData === "object") {
      if ("message" in errorData) {
        const raw = (errorData as { message: string | string[] }).message;
        message = Array.isArray(raw) ? raw.join(", ") : raw;
      } else if ("error" in errorData) {
        message = String((errorData as { error: string }).error);
      }
    }

    if (error.response.status === 401) message = "Invalid email or password";
    if (error.response.status === 403) message = "Access denied";
    if (error.response.status === 409) {
      message = "An account with this email already exists — try signing in instead.";
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async (): Promise<User> => {
    const { data } = await api.get("/users/profile");
    return unwrapUser(data);
  }, []);

  const refreshUser = useCallback(async () => {
    const userData = await fetchUserProfile();
    setUser(userData);
    return userData;
  }, [fetchUserProfile]);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        setStoredToken(token);
        const userData = await fetchUserProfile();
        if (mounted) setUser(userData);
      } catch {
        if (mounted) {
          setStoredToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void checkAuth();
    return () => {
      mounted = false;
    };
  }, [fetchUserProfile]);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      setIsLoading(true);
      const { data: loginResponse } = await api.post("/auth/login", {
        email,
        password,
      });

      const token =
        loginResponse?.data?.access_token ?? loginResponse?.access_token;

      if (!token) {
        throw new Error("No access token found in response");
      }

      setStoredToken(token);
      const userData = await fetchUserProfile();
      setUser(userData);
      toast.success("You've successfully logged in.");
      return userData;
    } catch (error) {
      setStoredToken(null);
      setUser(null);
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (form: RegisterForm) => {
    try {
      setIsLoading(true);
      const { data: registerResponse } = await api.post("/auth/register", form);

      if (!registerResponse?.data) {
        throw new Error("Invalid registration response");
      }

      const { user: created, verification_token, emailSent } = registerResponse.data;

      if (!created || !verification_token) {
        throw new Error("Incomplete registration response");
      }

      if (emailSent === false) {
        toast.error(
          'Account created, but we couldn\'t send the verification email. Please use "Resend code" on the next screen.',
        );
      } else {
        toast.success("Account created. Please check your email to verify your account.");
      }

      return {
        user: created,
        verification_token,
        emailSent: emailSent !== false,
      };
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        await api.post("/auth/logout");
      }
    } catch {
      // Still clear the client session if the server call fails.
    } finally {
      setStoredToken(null);
      setUser(null);
      setIsLoading(false);
      toast.success("You've been successfully logged out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
