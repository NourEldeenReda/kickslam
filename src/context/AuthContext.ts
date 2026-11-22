import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export type AuthResult = {
  error: string | null;
  needsConfirmation?: boolean;
};

export type AuthValue = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthValue | null>(null);
