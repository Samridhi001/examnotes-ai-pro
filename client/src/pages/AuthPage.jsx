import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, register, authError } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  const isRegisterMode = mode === "register";

  function updateField(event) {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError("");
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await register(form);
      } else {
        await login({
          email: form.email,
          password: form.password
        });
      }

      navigate("/notes");
    } catch (error) {
      setLocalError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">ExamNotesAI Pro</p>
        <h1>{isRegisterMode ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-copy">
          {isRegisterMode
            ? "Start building your AI-powered exam preparation workspace."
            : "Log in to continue your notes, history, and study workflows."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Samridhi Shandilya"
                autoComplete="name"
              />
            </label>
          )}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              placeholder="At least 8 characters"
              autoComplete={isRegisterMode ? "new-password" : "current-password"}
            />
          </label>

          {(localError || authError) && (
            <p className="form-error">{localError || authError}</p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Please wait..."
              : isRegisterMode
                ? "Create Account"
                : "Log In"}
          </button>
        </form>

        <div className="auth-switch">
          {isRegisterMode ? (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")}>
                Log in
              </button>
            </p>
          ) : (
            <p>
              New here?{" "}
              <button type="button" onClick={() => setMode("register")}>
                Create account
              </button>
            </p>
          )}
        </div>

        <Link to="/" className="back-link">
          Back to home
        </Link>
      </section>
    </main>
  );
}