import { apiFetch } from '../../../lib/apiClient';
import { CreateApplicationInput } from '../../../types/Application';

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
