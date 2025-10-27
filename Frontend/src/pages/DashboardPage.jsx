import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to your Dashboard!</h1>
      <p className="text-lg text-gray-300 mb-8">
        You have successfully registered and logged in.
      </p>
      <Link
        to="/"
        className="text-indigo-400 hover:text-indigo-300 font-medium"
      >
        Go back to Home
      </Link>
    </div>
  );
}