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
        {note ? <NoteResult note={note} /> : <EmptyResult />}
      </section>
    </main>
  );
}

function EmptyResult() {
  return (
    <div className="empty-state">
      <h2>No notes generated yet</h2>
      <p>Your generated output will appear here.</p>
    </div>
  );
}

function NoteResult({ note }) {
  const { content } = note;

  return (
    <article className="note-result">
      <div className="note-result-header">
        <div>
          <p className="eyebrow">Generated Note</p>
          <h2>{note.topic}</h2>
          <p>
            {note.classLevel} | {note.examType} | {note.generationProvider}
          </p>
        </div>
      </div>

      <section className="note-section">
        <h3>Summary</h3>
        <p>{content.summary}</p>
      </section>

      <section className="note-section">
        <h3>Key Points</h3>
        <ul>
          {content.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="note-section">
        <h3>Revision Checklist</h3>
        <ul>
          {content.revisionChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="note-section">
        <h3>Important Questions</h3>
        <p className="subheading">Short Questions</p>
        <ul>
          {content.importantQuestions.short.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>

        <p className="subheading">Long Questions</p>
        <ul>
          {content.importantQuestions.long.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <section className="note-section">
        <h3>Flashcards</h3>
        <div className="card-grid">
          {content.flashcards.map((card) => (
            <div className="study-card" key={card.front}>
              <strong>{card.front}</strong>
              <p>{card.back}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="note-section">
        <h3>Quiz</h3>
        <div className="card-grid">
          {content.quiz.map((item) => (
            <div className="study-card" key={item.question}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {content.diagram && (
        <section className="note-section">
          <h3>Diagram Draft</h3>
          <pre className="diagram-preview">{content.diagram}</pre>
        </section>
      )}

      {content.charts.length > 0 && (
        <section className="note-section">
          <h3>Chart Data</h3>
          <pre className="diagram-preview">
            {JSON.stringify(content.charts, null, 2)}
          </pre>
        </section>
      )}
    </article>
  );
}