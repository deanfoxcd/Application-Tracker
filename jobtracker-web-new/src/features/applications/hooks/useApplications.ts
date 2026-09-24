import { ChangeEvent, SubmitEvent, useEffect, useState } from 'react';
import { Application } from '../../../types/Application';
import { createApplication, fetchApplications } from '../services/applicationService';

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useApplications = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    dateApplied: getLocalDateString(),
    jobUrl: '',
  });

  const refetch = () => {
    setLoading(true);
    fetchApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await createApplication(formData);
      setFormData({
        companyName: '',
        position: '',
        dateApplied: getLocalDateString(),
        jobUrl: '',
      });
      const data = await fetchApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return { applications, loading, formData, handleSubmit, handleChange, refetch };
};
