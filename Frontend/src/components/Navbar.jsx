import React from 'react'

const Navbar = ({onLoginClick,onRegisterClick}) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">AI Quiz</h1>
        <div className="space-x-4">
          <button
            onClick={onLoginClick}
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar