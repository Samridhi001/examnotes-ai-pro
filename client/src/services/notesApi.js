import { apiClient } from "./apiClient";

export async function generateNotes(payload) {
  const response = await apiClient.post("/notes/generate", payload);
  return response.data;
}

export async function getNotesHistory() {
  const response = await apiClient.get("/notes");
  return response.data;
}

export async function getNoteById(noteId) {
  const response = await apiClient.get(`/notes/${noteId}`);
  return response.data;
}

export async function deleteNote(noteId) {
  const response = await apiClient.delete(`/notes/${noteId}`);
  return response.data;
}

export async function toggleFavoriteNote(noteId) {
  const response = await apiClient.patch(`/notes/${noteId}/favorite`);
  return response.data;
}