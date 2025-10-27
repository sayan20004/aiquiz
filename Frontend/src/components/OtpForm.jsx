import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function OtpForm({ onClose, email }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading('Verifying OTP...');

    try {
      const res = await fetch('/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      toast.success(data.message || 'Verification successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles =
    'w-full p-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-lg tracking-widest';

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Verify your Email
      </h2>
      <p className="text-gray-400 text-center mb-6">
        Enter the 6-digit code sent to
        <br />
        <strong className="text-white">{email}</strong>
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
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-md transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify Account'}
        </button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-4">
        Didn't get a code? Click to resend. (Resend logic not implemented)
      </p>
    </Modal>
  );
}