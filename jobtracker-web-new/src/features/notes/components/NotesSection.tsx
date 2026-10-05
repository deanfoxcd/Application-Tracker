import { FormEvent, useState } from 'react';
import { useNotes } from '../hooks/useNotes';

interface Props {
  jobApplicationId: number;
}

export const NotesSection = ({ jobApplicationId }: Props) => {
  const { notes, loading, addNote, editNote, removeNote } = useNotes(jobApplicationId);
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    addNote(newContent.trim());
    setNewContent('');
  };

  const startEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleEditSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editContent.trim() || editingId === null) return;
    editNote(editingId, editContent.trim());
    setEditingId(null);
  };

  return (
    <div className='bg-gray-50 border border-gray-200 rounded p-3 mt-2 text-left max-w-md mx-auto'>
      <h3 className='font-bold text-sm pb-2'>Notes</h3>

      {loading ? (
        <p className='text-sm'>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className='text-sm text-gray-500'>No notes yet</p>
      ) : (
        <ul className='list-none flex flex-col gap-2'>
          {notes.map((note) =>
            editingId === note.id ? (
              <li key={note.id}>
                <form onSubmit={handleEditSave} className='flex gap-2'>
                  <input
                    className='border border-gray-300 rounded px-2 py-1 flex-1'
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='text-blue-500 text-sm cursor-pointer'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={() => setEditingId(null)}
                    className='text-sm cursor-pointer'
                  >
                    Cancel
                  </button>
                </form>
              </li>
            ) : (
              <li
                key={note.id}
                className='text-sm border-b border-gray-200 pb-2'
              >
                <p>{note.content}</p>
                <span className='text-xs text-gray-400'>
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => startEdit(note.id, note.content)}
                  className='text-blue-500 text-xs ml-3 cursor-pointer'
                >
                  Edit
                </button>
                <button
                  onClick={() => removeNote(note.id)}
                  className='text-red-500 text-xs ml-2 cursor-pointer'
                >
                  Delete
                </button>
              </li>
            ),
          )}
        </ul>
      )}

      <form onSubmit={handleAdd} className='flex gap-2 pt-3'>
        <input
          className='border border-gray-300 rounded px-2 py-1 flex-1'
          placeholder='Add a note...'
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 cursor-pointer'
        >
          Add
        </button>
      </form>
    </div>
  );
};
