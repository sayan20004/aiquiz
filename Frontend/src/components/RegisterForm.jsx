import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from './Modal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; 

export default function RegisterForm({ onClose, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // ... (handleSubmit function remains the same) ...

  const inputStyles =
    'w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Create your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className={inputStyles}
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name (Optional)"
          className={inputStyles}
          value={formData.lastName}
          onChange={handleChange}
        />
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
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-md transition duration-300 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </Modal>
  );
}