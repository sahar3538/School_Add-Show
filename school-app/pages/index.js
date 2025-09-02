import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">🏫 School Management</h1>

        <div className="space-x-4">
            <Link href="/addSchool">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
                Add School
            </button>
            </Link>

            <Link href="/showSchools">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700">
                View Schools
            </button>
            </Link>
        </div>
    </div>

  );
}
