import { useState } from "react";
import { getApiErrorMessage } from "../services/apiClient";
import { generateNotes } from "../services/notesApi";

const initialForm = {
  topic: "",
  sourceText: "",
  classLevel: "",
  examType: "",
  revisionMode: false,
  includeDiagram: false,
  includeChart: false
};

export function NotesPage() {
  const [form, setForm] = useState(initialForm);
  const [note, setNote] = useState(null);
  const [status, setStatus] = useState("Generate your first AI-ready study note.");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setStatus("Generating notes...");
    setIsGenerating(true);

    try {
      const response = await generateNotes({
        ...form,
        classLevel: form.classLevel || "General",
        examType: form.examType || "General"
      });

      setNote(response.data.note);
      setStatus("Notes generated and saved successfully.");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      setStatus("Could not generate notes.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="notes-workspace">
      <section className="notes-form-panel">
        <p className="eyebrow">Notes Workspace</p>
        <h1>Generate Notes</h1>
        <p className="section-copy">
          Create exam-ready notes from a topic or pasted study material.
        </p>

        <form className="notes-form" onSubmit={handleSubmit}>
          <label>
            Topic
            <input
              name="topic"
              value={form.topic}
              onChange={updateField}
              placeholder="Photosynthesis"
            />
          </label>

          <label>
            Study Material
            <textarea
              name="sourceText"
              value={form.sourceText}
              onChange={updateField}
              rows="8"
              placeholder="Paste textbook content, class notes, or leave blank for topic-only notes."
            />
          </label>

          <div className="form-grid">
            <label>
              Class / Level
              <input
                name="classLevel"
                value={form.classLevel}
                onChange={updateField}
                placeholder="Class 10"
              />
            </label>

            <label>
              Exam Type
              <input
                name="examType"
                value={form.examType}
                onChange={updateField}
                placeholder="CBSE / JEE / General"
              />
            </label>
          </div>

          <div className="toggle-row">
            <label>
              <input
                name="revisionMode"
                type="checkbox"
                checked={form.revisionMode}
                onChange={updateField}
              />
              Revision Mode
            </label>

            <label>
              <input
                name="includeDiagram"
                type="checkbox"
                checked={form.includeDiagram}
                onChange={updateField}
              />
              Include Diagram
            </label>

            <label>
              <input
                name="includeChart"
                type="checkbox"
                checked={form.includeChart}
                onChange={updateField}
              />
              Include Chart
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Notes"}
          </button>
        </form>
      </section>

      <section className="notes-result-panel">
        <p className="status-text">{status}</p>
        {note ? (
          <pre className="raw-note-preview">
            {JSON.stringify(note.content, null, 2)}
          </pre>
        ) : (
          <div className="empty-state">
            <h2>No notes generated yet</h2>
            <p>Your generated output will appear here.</p>
          </div>
        )}
      </section>
    </main>
  );
}