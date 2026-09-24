import { FormEvent, useState } from 'react';
import {
  login as loginRequest,
  register as registerRequest,
} from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = isRegister
        ? await registerRequest(email, password)
        : await loginRequest(email, password);
      login(token);
    } catch {
      setError(
        isRegister
          ? 'Registration failed. Email may already be in use.'
          : 'Invalid email or password.',
      );
    }
  };

  return (
    <div className='max-w-sm mx-auto mt-20'>
      <h2 className='text-2xl font-bold pb-4 text-center'>
        {isRegister ? 'Register' : 'Login'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2'
      >
        <input
          className='border border-gray-300 rounded px-2 py-1'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='border border-gray-300 rounded px-2 py-1'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className='text-blue-500 text-sm mt-3 block mx-auto cursor-pointer'
      >
        {isRegister
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};
