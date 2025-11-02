import React from 'react';
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Quiz</h1>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-300"
          >
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;