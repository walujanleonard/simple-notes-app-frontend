import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const EditNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const note = await response.json();
      setTitle(note.title);
      setContent(note.content);
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/notes/${id}`,
      {
        method: "PUT",
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
        <h1 className="text-2xl font-bold mb-8">Edit Note</h1>
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
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
