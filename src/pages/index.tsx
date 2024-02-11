import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl font-bold">Welcome to NoteApp</h1>
        <div className="flex space-x-4">
          <Link
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
