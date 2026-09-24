import { useState } from 'react';
import { Application, UpdateApplicationInput } from '../../../types/Application';
import { EditApplicationForm } from './EditApplicationForm';

interface ApplicationsListProps {
  applications: Application[];
  loading: boolean;
  onUpdate: (id: number, data: UpdateApplicationInput) => void;
  onDelete: (id: number) => void;
}

export const ApplicationsList = ({
  applications,
  loading,
  onUpdate,
  onDelete,
}: ApplicationsListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSave = (id: number, data: UpdateApplicationInput) => {
    onUpdate(id, data);
    setEditingId(null);
  };

  return (
    <>
      <h2 className='text-2xl font-bold pt-3'>Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <ul className='list-none'>
          {applications.map((app) =>
            editingId === app.id ? (
              <li key={app.id}>
                <EditApplicationForm
                  application={app}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li
                key={app.id}
                className='py-2'
              >
                <strong>{app.companyName}</strong> - {app.position}
                <br />
                Status: {app.status} | Applied:{' '}
                {new Date(app.dateApplied).toLocaleDateString()}
                {app.jobUrl && (
                  <>
                    {' | '}
                    <a
                      href={app.jobUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline'
                    >
                      Job Posting
                    </a>
                  </>
                )}
                <br />
                <button
                  onClick={() => setEditingId(app.id)}
                  className='text-blue-500 text-sm mr-3 cursor-pointer'
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(app.id)}
                  className='text-red-500 text-sm cursor-pointer'
                >
                  Delete
                </button>
              </li>
            ),
          )}
        </ul>
      )}
    </>
  );
};
