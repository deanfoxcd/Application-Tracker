import { useEffect } from 'react';
import { ApplicationDetailsForm } from './features/applicationsForm/components/ApplicationDetailsForm';
import { useApplications } from './features/applications/hooks/useApplications';
import { ApplicationsList } from './features/applicationsList/components/ApplicationsList';
import { AuthForm } from './features/auth/components/AuthForm';
import { useAuth } from './features/auth/context/AuthContext';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const { applications, loading, formData, handleSubmit, handleChange, refetch } =
    useApplications();

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className='text-center'>
      <button
        onClick={logout}
        className='float-right m-3 text-sm text-blue-500'
      >
        Log out
      </button>
      <h1 className='text-3xl font-bold pb-3'>Job Application Tracker</h1>

      <div>
        <h2 className='text-2xl pb-2'>Add Application</h2>
        <ApplicationDetailsForm
          formData={formData}
          onFormChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <div>
        <ApplicationsList
          applications={applications}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
