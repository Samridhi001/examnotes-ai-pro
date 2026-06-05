import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import "./App.css";
import { NotesPage } from "./pages/NotesPage.jsx";

function App() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <header className="top-nav">
        <Link to="/" className="brand">
          ExamNotesAI Pro
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/history">History</Link>
          <Link to="/pricing">Pricing</Link>

          {isAuthenticated ? (
            <button className="nav-button" type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </nav>
      </header>

      {isAuthenticated && (
        <div className="user-strip">
          Logged in as <strong>{user.name}</strong> | Credits:{" "}
          <strong>{user.credits}</strong>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </div>
  );
}

function HomePage() {
  return (
    <main className="hero">
      <section>
        <p className="eyebrow">AI Exam Preparation Platform</p>
        <h1>Generate smarter notes for serious exam revision.</h1>
        <p className="hero-copy">
          Create exam-focused notes, flashcards, quizzes, diagrams, charts, and
          downloadable study resources using AI.
        </p>

        <div className="hero-actions">
          <Link to="/notes" className="primary-action">
            Start Generating
          </Link>
          <Link to="/pricing" className="secondary-action">
            View Plans
          </Link>
        </div>
      </section>

      <aside className="preview-card">
        <h2>What this platform will include</h2>
        <ul>
          <li>Gemini-powered note generation</li>
          <li>Saved notes and history</li>
          <li>Flashcards and quizzes</li>
          <li>Diagrams, charts, and PDF exports</li>
          <li>Credits and Stripe payments</li>
        </ul>
      </aside>
    </main>
  );
}

function NotesPage() {
  return (
    <main className="page-panel">
      <h1>Generate Notes</h1>
      <p>The AI notes workspace will be built in a later milestone.</p>
    </main>
  );
}

function HistoryPage() {
  return (
    <main className="page-panel">
      <h1>History</h1>
      <p>Saved notes history will appear here after notes generation is added.</p>
    </main>
  );
}

function PricingPage() {
  return (
    <main className="page-panel">
      <h1>Pricing</h1>
      <p>Credit plans and Stripe checkout will be added later.</p>
    </main>
  );
}

export default App;