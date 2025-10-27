import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function LoginForm({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading('Logging in...');

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast.success(data.message || 'Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles =
    'w-full p-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Login to your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className={inputStyles}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className={inputStyles}
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-md transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </Modal>
  );
}