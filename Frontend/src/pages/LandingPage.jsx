import { useState } from 'react';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';
import OtpForm from '../components/OtpForm';
import LoginForm from '../components/LoginForm';

export default function LandingPage() {
  const [modalView, setModalView] = useState('none');
  const [userEmail, setUserEmail] = useState('');

  const handleRegisterSuccess = (email) => {
    setUserEmail(email);
    setModalView('otp');
  };

  const closeModals = () => {
    setModalView('none');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar
        onRegisterClick={() => setModalView('register')}
        onLoginClick={() => setModalView('login')}
      />

      <main className="container mx-auto px-6 pt-24 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to the AI-Powered Quiz
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Challenge your knowledge and compete with others.
        </p>
        <button
          onClick={() => setModalView('register')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
        >
          Get Started
        </button>
      </main>

      {modalView === 'register' && (
        <RegisterForm
          onClose={closeModals}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {modalView === 'otp' && (
        <OtpForm onClose={closeModals} email={userEmail} />
      )}

      {modalView === 'login' && <LoginForm onClose={closeModals} />}
    </div>
  );
}