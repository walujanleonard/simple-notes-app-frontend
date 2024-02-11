import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/notes");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/notes");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-6 bg-white rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-700 hover:bg-indigo-500 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center">
          Dont have an account?{" "}
          <Link
            className="text-indigo-700 hover:text-indigo-500"
            href="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
