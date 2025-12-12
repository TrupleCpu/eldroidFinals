import { UserPlus } from "lucide-react";
import React, { useState } from "react";

const AddStudent = ({ setCurrent }: { setCurrent: (value: string) => void }) => {
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0">
      <form className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6">
        <div className="flex flex-col items-center">
          <label
            htmlFor="profileImage"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-center">
                Click to add photo
              </span>
            )}
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="IDNO"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
          />
          <input
            type="text"
            placeholder="LASTNAME"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
          />
          <input
            type="text"
            placeholder="FIRSTNAME"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
          />
          <input
            type="text"
            placeholder="COURSE"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
          />
          <input
            type="text"
            placeholder="LEVEL"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div className="flex gap-5">
          <button
            type="button"
            className="w-full p-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex justify-center items-center gap-2"
            onClick={() => setCurrent('EnterPin')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition flex justify-center items-center gap-2"
          >
            <UserPlus />
            Add Student
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddStudent;
