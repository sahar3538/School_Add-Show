import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 sm:p-12">
      
      <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900">
        🏫 School Management
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Link href="/addSchool">
          <button className="w-full sm:w-auto bg-blue-600 text-white text-xl sm:text-2xl font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
            Add School
          </button>
        </Link>

        <Link href="/showSchools">
          <button className="w-full sm:w-auto bg-green-600 text-white text-xl sm:text-2xl font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200">
            View Schools
          </button>
        </Link>
      </div>

      <p className="mt-10 text-gray-700 text-center text-base sm:text-lg max-w-sm">
        Manage your schools easily on any device. Simple, clean, and fast.
      </p>
    </div>
  );
}
