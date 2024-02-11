import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401) {
              router.push("/login");
            }
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setNotes(data))
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [router]);

  const handleDelete = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Link
          className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-500"
          href="/notes/new"
        >
          Create Note
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-500 mr-4"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <div className="mt-4">
              <Link
                className="text-indigo-700 hover:text-indigo-500 mr-4"
                href={`/notes/${note.id}/edit`}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
