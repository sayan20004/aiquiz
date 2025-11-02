import React from 'react';
import ThemeToggler from './ThemeToggler'; // <-- Import

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md z-50 shadow-sm dark:shadow-none">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Quiz
        </h1>
        <div className="flex items-center space-x-4">
          <ThemeToggler /> {/* <-- Add Toggler */}
          <button
            onClick={onLoginClick}
            className="bg-transparent border border-gray-600 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;