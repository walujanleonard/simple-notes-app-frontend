import { useState } from "react";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const NewNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content }),
      }
    );
    if (response.status === 401) {
      router.push("/login");
    } else if (response.ok) {
      router.push("/notes");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-8">New Note</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          />
          <ReactQuill value={content} onChange={setContent} className="mb-6" />
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-700 hover:bg-indigo-500 rounded"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewNote;
