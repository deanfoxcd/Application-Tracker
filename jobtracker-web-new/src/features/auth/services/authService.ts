import { apiFetch } from '../../../lib/apiClient';

export const register = async (email: string, password: string) => {
  const response = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  const data = await response.json();
  return data.token as string;
};

export const login = async (email: string, password: string) => {
  const response = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Invalid email or password');
  }
  const data = await response.json();
  return data.token as string;
};
