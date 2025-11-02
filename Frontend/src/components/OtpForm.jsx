import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function OtpForm({ onClose, email }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ... (handleSubmit function remains the same) ...

  const inputStyles =
    'w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-lg tracking-widest';

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Verify your Email
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
        Enter the 6-digit code sent to
        <br />
        <strong className="text-gray-800 dark:text-white">{email}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="otp"
          placeholder="123456"
          required
          maxLength={6}
          className={inputStyles}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-md transition duration-300 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify Account'}
        </button>
      </form>
    </Modal>
  );
}