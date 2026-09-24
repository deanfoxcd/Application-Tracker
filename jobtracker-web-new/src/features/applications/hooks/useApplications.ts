import { ChangeEvent, SubmitEvent, useEffect, useState } from 'react';
import { Application } from '../../../types/Application';
import { createApplication, fetchApplications } from '../services/applicationService';

export const useApplications = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    dateApplied: new Date().toISOString().split('T')[0],
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
        dateApplied: new Date().toISOString().split('T')[0],
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
