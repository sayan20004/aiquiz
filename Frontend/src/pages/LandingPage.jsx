import { useState } from 'react';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';
import OtpForm from '../components/OtpForm';
import LoginForm from '../components/LoginForm';
import FeaturesSection from '../components/FeaturesSection';
import LearningJourneySection from '../components/LearningJourneySection';
import Footer from '../components/Footer';

// Updated placeholder to be theme-aware
const headerImg = '../src/assets/header.svg'

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar onLoginClick={() => setModalView('login')} />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-6rem)]">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Learn new concepts
              <br />
              each minute
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              We help you prepare for exams and quizzes.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <button
                onClick={() => setModalView('register')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
              >
                Start solving
              </button>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition duration-300"
              >
                &raquo; know more
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="md:w-1/2 max-w-md mx-auto">
            <img src={headerImg} alt="" srcset="" />
          </div>
        </div>
      </main>

      <FeaturesSection />
      <LearningJourneySection />
      <Footer />

      {/* Modals */}
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