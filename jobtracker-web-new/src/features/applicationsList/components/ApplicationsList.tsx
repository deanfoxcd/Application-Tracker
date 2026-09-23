import { Application } from '../../../types/Application';

interface ApplicationsListProps {
  applications: Application[];
  loading: boolean;
}

export const ApplicationsList = ({
  applications,
  loading,
}: ApplicationsListProps) => {
  return (
    <>
      <h2 className='text-2xl font-bold pt-3'>Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <ul className='list-none'>
          {applications.map((app) => (
            <li
              key={app.id}
              className='py-2'
            >
              <strong>{app.companyName}</strong> - {app.position}
              <br />
              Status: {app.status} | Applied:{' '}
              {new Date(app.dateApplied).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
