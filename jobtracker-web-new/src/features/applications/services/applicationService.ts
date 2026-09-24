import { apiFetch } from '../../../lib/apiClient';
import { CreateApplicationInput, UpdateApplicationInput } from '../../../types/Application';

export const fetchApplications = async () => {
  const response = await apiFetch('/api/jobapplications');
  return response.json();
};

export const createApplication = async (data: CreateApplicationInput) => {
  const response = await apiFetch('/api/jobapplications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateApplication = async (id: number, data: UpdateApplicationInput) => {
  await apiFetch(`/api/jobapplications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteApplication = async (id: number) => {
  await apiFetch(`/api/jobapplications/${id}`, {
    method: 'DELETE',
  });
};
