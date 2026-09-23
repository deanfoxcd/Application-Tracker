import { useEffect } from 'react';
import './App.css';
import { ApplicationDetailsForm } from './features/applicationsForm/components/ApplicationDetailsForm';
import { fetchApplications } from './features/applications/services/applicationService';
import { useApplications } from './features/applications/hooks/useApplications';
import { ApplicationsList } from './features/applicationsList/components/ApplicationsList';

interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: string;
  dateApplied: string;
}

function App() {
  const { applications, loading, formData, handleSubmit, handleChange } =
    useApplications();

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold pb-3'>Job Application Tracker</h1>

      <div className='form-container'>
        <h2 className='text-2xl pb-2'>Add Application</h2>
        <ApplicationDetailsForm
          formData={formData}
          onFormChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <div className='applications-container'>
        <ApplicationsList
          applications={applications}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
