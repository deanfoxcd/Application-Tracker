import { apiFetch } from '../../../lib/apiClient';
import { CreateNoteInput, UpdateNoteInput } from '../../../types/Application';

export const fetchNotesByApplicationId = async (jobApplicationId: number) => {
  const response = await apiFetch(`/api/notes/job-application/${jobApplicationId}`);
  return response.json();
};

export const createNote = async (data: CreateNoteInput) => {
  const response = await apiFetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateNote = async (id: number, data: UpdateNoteInput) => {
  await apiFetch(`/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteNote = async (id: number) => {
  await apiFetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });
};
