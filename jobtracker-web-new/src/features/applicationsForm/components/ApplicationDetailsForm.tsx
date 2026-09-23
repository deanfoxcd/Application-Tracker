import { ChangeEvent, SubmitEvent } from 'react';

interface Props {
  formData: {
    companyName: string;
    position: string;
    dateApplied: string;
    jobUrl: string;
  };
  onFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: SubmitEvent) => void;
}

export const ApplicationDetailsForm = ({
  formData,
  onFormChange,
  onSubmit,
}: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className='flex gap-2 items-center justify-center'
    >
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='text'
        name='companyName'
        placeholder='Company Name'
        value={formData.companyName}
        onChange={onFormChange}
        required
      />
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='text'
        name='position'
        placeholder='Position'
        value={formData.position}
        onChange={onFormChange}
        required
      />
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='date'
        name='dateApplied'
        value={formData.dateApplied}
        onChange={onFormChange}
        required
      />
      <input
        className='border border-gray-300 rounded px-2 py-1'
        type='url'
        name='jobUrl'
        placeholder='Job URL'
        value={formData.jobUrl}
        onChange={onFormChange}
      />
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
        Add Application
      </button>
    </form>
  );
};
