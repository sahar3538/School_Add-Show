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
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">Add School</h1>

        <input {...register("name", { required: true })} placeholder="School Name" className="w-full border p-2 rounded" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("address", { required: true })} placeholder="Address" className="w-full border p-2 rounded" />
        <input {...register("city", { required: true })} placeholder="City" className="w-full border p-2 rounded" />
        <input {...register("state", { required: true })} placeholder="State" className="w-full border p-2 rounded" />

        <input {...register("contact", { required: true, pattern: /^[0-9]{10}$/ })}
          placeholder="Contact Number" className="w-full border p-2 rounded" />
        {errors.contact && <p className="text-red-500">Valid 10-digit number required</p>}

        <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email" className="w-full border p-2 rounded" />
        {errors.email_id && <p className="text-red-500">Enter valid email</p>}

        <input type="file" accept=".jpg,.jpeg,.png" {...register("image", { required: true })} className="w-full" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Submit</button>

        {message && <p className="text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
