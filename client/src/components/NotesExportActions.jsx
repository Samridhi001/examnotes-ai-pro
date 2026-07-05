import { useState } from "react";
import {
  buildNotesMarkdown,
  createSafeFileName,
  downloadTextFile
} from "../utils/notesExport";

export function NotesExportActions({ note }) {
  const [copyStatus, setCopyStatus] = useState("");

  if (!note) {
    return null;
  }

  const fileBaseName = createSafeFileName(note.topic);
  const markdown = buildNotesMarkdown(note);

  async function handleCopyMarkdown() {
    await navigator.clipboard.writeText(markdown);
    setCopyStatus("Copied");
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  function handleDownloadMarkdown() {
    downloadTextFile({
      fileName: `${fileBaseName}.md`,
      content: markdown,
      mimeType: "text/markdown"
    });
  }

  function handleDownloadJson() {
    downloadTextFile({
      fileName: `${fileBaseName}.json`,
      content: JSON.stringify(note, null, 2),
      mimeType: "application/json"
    });
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="notes-export-actions">
      <button type="button" onClick={handleCopyMarkdown}>
        {copyStatus || "Copy Markdown"}
      </button>

      <button type="button" onClick={handleDownloadMarkdown}>
        Download MD
      </button>

      <button type="button" onClick={handleDownloadJson}>
        Download JSON
      </button>

      <button type="button" onClick={handlePrint}>
        Print / PDF
      </button>
    </div>
  );
}