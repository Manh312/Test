import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>
      <nav className="space-y-4">
        <Link
          to="/question1"
          className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Go to Question 1 (Stop Watch)
        </Link>
        <Link
          to="/question2"
          className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Go to Question 2 (Search Feature)
        </Link>
      </nav>
    </div>
  );
};

export default Home;