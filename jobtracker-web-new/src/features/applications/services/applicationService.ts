import { CreateApplicationInput } from "../../../types/Application";

export const fetchApplications = async () => {
  const response = await fetch('http://localhost:5160/api/jobapplications');
  return response.json();
};

export const createApplication = async (data: CreateApplicationInput) => {
  const response = await fetch('http://localhost:5160/api/jobapplications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
