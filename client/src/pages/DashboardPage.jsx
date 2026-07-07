import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiErrorMessage } from "../services/apiClient";
import { getNotesStats } from "../services/notesApi";
import { useAuth } from "../context/AuthContext";

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalNotes: 0,
    favoriteNotes: 0,
    latestNotes: [],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await getNotesStats();
        setStats(response.data.stats);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome back, {user?.name || "Student"}</h1>
          <p className="section-copy">
            Track your generated notes, favorites, and revision workspace.
          </p>
        </div>

        <Link className="primary-link" to="/notes">
          Generate Notes
        </Link>
      </section>

      {error && <p className="form-error">{error}</p>}

      <section className="dashboard-grid">
        <article className="stat-card">
          <span>Total Notes</span>
          <strong>{isLoading ? "..." : stats.totalNotes}</strong>
        </article>

        <article className="stat-card">
          <span>Favorites</span>
          <strong>{isLoading ? "..." : stats.favoriteNotes}</strong>
        </article>

        <article className="stat-card">
          <span>Credits</span>
          <strong>{user?.credits ?? 0}</strong>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Recent Work</p>
            <h2>Latest Notes</h2>
          </div>

          <Link to="/notes">View workspace</Link>
        </div>

        {stats.latestNotes.length === 0 ? (
          <p className="history-empty">No notes yet. Generate your first one.</p>
        ) : (
          <div className="latest-list">
            {stats.latestNotes.map((note) => (
              <article className="latest-note" key={note._id}>
                <div>
                  <h3>{note.topic}</h3>
                  <p>
                    {note.classLevel} | {note.examType} |{" "}
                    {note.generationProvider}
                  </p>
                </div>

                {note.isFavorite && <span>Favorite</span>}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}