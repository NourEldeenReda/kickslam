import { useState, type FormEvent } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

type Mode = "signin" | "signup";

function LoginPage() {
  const { user, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to="/" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    const result =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password);

    setBusy(false);
    if (result.error) {
      setMessage(result.error);
    } else if (result.needsConfirmation) {
      setMessage("Check your email to confirm your account, then sign in.");
    }
  }

  function switchMode() {
    setMode(mode === "signin" ? "signup" : "signin");
    setMessage(null);
  }

  return (
    <section className="auth-card">
      <h1 className="page-title">
        {mode === "signin" ? "Log in" : "Create your account"}
      </h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            minLength={8}
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {message && (
          <p className="auth-message" role="alert">
            {message}
          </p>
        )}

        <button type="submit" disabled={busy}>
          {busy ? "Please wait..." : mode === "signin" ? "Log in" : "Sign up"}
        </button>
      </form>

      <p className="auth-switch">
        {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
        <button type="button" className="link-button" onClick={switchMode}>
          {mode === "signin" ? "Create an account" : "Log in"}
        </button>
      </p>
    </section>
  );
}

export default LoginPage;
