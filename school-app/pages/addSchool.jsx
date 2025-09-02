import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields
    Object.keys(data).forEach((key) => {
      if (key !== "image") formData.append(key, data[key]);
    });

    // Append image file
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      setMessage("Please select an image");
      return;
    }

    try {
      const res = await fetch("/api/addSchool", { method: "POST", body: formData });
      const result = await res.json();
      setMessage(result.message || result.error);
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Add School</h1>

        <div className="space-y-4">
          <input 
            {...register("name", { required: true })} 
            placeholder="School Name" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

          <input 
            {...register("address", { required: true })} 
            placeholder="Address" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            {...register("city", { required: true })} 
            placeholder="City" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            {...register("state", { required: true })} 
            placeholder="State" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input 
            {...register("contact", { required: true, pattern: /^[0-9]{10}$/ })} 
            placeholder="Contact Number" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contact && <p className="text-red-500 text-sm">Valid 10-digit number required</p>}

          <input 
            {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} 
            placeholder="Email" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email_id && <p className="text-red-500 text-sm">Enter a valid email</p>}

          <input 
            type="file" 
            accept=".jpg,.jpeg,.png" 
            {...register("image", { required: true })} 
            className="w-full"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>

        {message && <p className="text-center text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
