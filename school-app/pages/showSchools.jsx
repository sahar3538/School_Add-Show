import { useEffect, useState } from "react";

export default function SchoolsList() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/getSchools")
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-center">Loading schools...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {schools.map(school => (
        <div key={school.id} className="border p-4 rounded shadow-md">
          <img
            src={school.image}
            alt={school.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h2 className="text-lg font-bold">{school.name}</h2>
          <p className="text-gray-600">{school.address}</p>
          <p className="text-gray-500 font-medium">City: {school.city}</p>
        </div>
      ))}
    </div>
  );
}
