import { ChangeEvent, FormEvent, useState } from 'react';
import { Application, UpdateApplicationInput } from '../../../types/Application';

interface Props {
  application: Application;
  onSave: (id: number, data: UpdateApplicationInput) => void;
  onCancel: () => void;
}

export const EditApplicationForm = ({ application, onSave, onCancel }: Props) => {
  const [formData, setFormData] = useState<UpdateApplicationInput>({
    companyName: application.companyName,
    position: application.position,
    status: application.status,
    dateApplied: application.dateApplied.split('T')[0],
    jobUrl: application.jobUrl ?? '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(application.id, formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-wrap gap-2 items-center justify-center py-2'
    >
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='text'
        name='companyName'
        placeholder='Company Name'
        value={formData.companyName}
        onChange={handleChange}
        required
      />
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='text'
        name='position'
        placeholder='Position'
        value={formData.position}
        onChange={handleChange}
        required
      />
      <select
        className='border border-gray-300 rounded px-2 py-1'
        name='status'
        value={formData.status}
        onChange={handleChange}
      >
        <option value='Applied'>Applied</option>
        <option value='Interviewing'>Interviewing</option>
        <option value='Offer'>Offer</option>
        <option value='Rejected'>Rejected</option>
      </select>
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='date'
        name='dateApplied'
        value={formData.dateApplied}
        onChange={handleChange}
        required
      />
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='url'
        name='jobUrl'
        placeholder='Job URL'
        value={formData.jobUrl}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer'
      >
        Save
      </button>
      <button
        type='button'
        onClick={onCancel}
        className='px-3 py-1 rounded border border-gray-300 cursor-pointer'
      >
        Cancel
      </button>
    </form>
  );
};
