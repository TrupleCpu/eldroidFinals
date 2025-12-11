"use client";
import { useEffect, useRef, useState } from "react";
import { UserPlus } from "lucide-react";

export default function Home() {
  const [id, setId] = useState<string[]>(["", "", "", ""]);
  const [selectedImage, setSelectedImage] = useState<any>();
  const inputRefs: any = useRef([]);

  useEffect(() => {
    const userId = id.join("");
    if (id.length === 4 && !id.includes("")) {
    }
  }, [id]);

  const handlePinChange = (index: number, value: any) => {
    if (!/^\d*$/.test(value)) return;

    const newId = [...id];
    newId[index] = value;
    setId(newId);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !id[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      }

      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 w-full text-center rounded-bl-full rounded-br-full">
        <h1 className="p-4 text-2xl sm:text-3xl font-semibold text-white">
          Student Management System
        </h1>
      </header>

      {/* { <main className="flex-1 flex flex-col items-center justify-center px-4 space-y-6 sm:space-y-8">
        
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg space-y-4">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">
            Enter Student ID Number
          </label>
          <div className="flex justify-center gap-3 mb-2 flex-wrap">
            {id.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 sm:w-14 h-12 sm:h-16 rounded-xl border-2 text-center text-2xl sm:text-3xl font-bold transition-all duration-200 outline-none
                  ${digit 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 bg-slate-50 text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-md focus:-translate-y-1'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-md">
          <button className="flex items-center justify-center bg-blue-500 text-white font-semibold w-full p-4 gap-2 rounded-md hover:bg-blue-600 transition">
            <UserPlus />
            Add Student
          </button>
        </div>

        <div className="w-full max-w-md bg-slate-200 border-slate-200 flex flex-col justify-center items-center py-4 rounded-md">
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 transition-colors duration-300 bg-slate-300 text-slate-400">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          </div>
          <p className="text-lg font-bold transition-colors duration-300 text-slate-400 text-center">
            Waiting for Input...
          </p>
        </div>
      </main>} */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0">
        <form className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
          <label 
            htmlFor="profileImage" 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition"
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-center">Click to add photo</span>
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
            <button type="button" className="w-full p-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex justify-center items-center gap-2">
            Cancel
          </button>
            <button type="submit" className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition flex justify-center items-center gap-2">
            <UserPlus />
            Add Student
          </button>
        </div>
        </form>
      </main>

      <footer className=" text-center p-2">
        <p className="text-xs  font-medium">Copyright © Amaya 2025</p>
      </footer>
    </div>
  );
}
