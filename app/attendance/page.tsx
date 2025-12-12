"use client";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [students, setStudents] = useState([
    {
      id: "1000",
      lastName: "DURANO",
      firstName: "DENNIS",
      course: "BSCS",
      level: "3",
      photoUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "1001",
      lastName: "SANTOS",
      firstName: "MARIA",
      course: "BSIT",
      level: "2",
      photoUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "1002",
      lastName: "REYES",
      firstName: "JOSEPH",
      course: "BSCS",
      level: "4",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();

        console.log(data);
        setStudents(data);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this student record?")
    ) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 w-full text-center rounded-bl-full rounded-br-full mb-5">
        <h1 className="p-4 text-2xl sm:text-3xl font-semibold text-white">
          Student Attendance
        </h1>
      </header>

      <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="p-4 w-32 border-r border-gray-300"></th>

              <th className="p-3 text-left font-bold border-r border-gray-300 w-24">
                IDNO
              </th>
              <th className="p-3 text-left font-bold border-r border-gray-300">
                NAME
              </th>
              <th className="p-3 text-left font-bold border-r border-gray-300">
                DATE
              </th>
              <th className="p-3 text-center font-bold border-r border-gray-300 w-24">
                TIME
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-300 hover:bg-blue-50 transition-colors"
                >
                  <td className="p-4 border-r border-gray-300 align-middle">
                    <div className="w-24 h-24 mx-auto bg-gray-200 overflow-hidden border border-gray-300 shadow-sm relative">
                      {student.photoUrl ? (
                        <img
                          src={student.photoUrl}
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      ) : null}

                      <div
                        className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
                        style={{ display: student.photoUrl ? "none" : "flex" }}
                      >
                        <User size={48} />
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-blue-700 font-medium border-r border-gray-300 align-top pt-8">
                    {student.id}
                  </td>
                  <td className="p-3 text-blue-700 font-medium border-r border-gray-300 align-top pt-8">
                    {student.lastName}
                  </td>
                  <td className="p-3 text-blue-700 font-medium border-r border-gray-300 align-top pt-8">
                    {student.firstName}
                  </td>
                  <td className="p-3 text-center text-blue-700 font-medium border-r border-gray-300 align-top pt-8">
                    {student.course}
                  </td>
                  <td className="p-3 text-center text-blue-700 font-medium border-r border-gray-300 align-top pt-8">
                    {student.level}
                  </td>

                  <td className="p-3 align-top pt-6 text-center">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-sm text-sm transition"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-12 text-center text-gray-500">
                  No attendees.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="fixed bottom-0 w-full text-center p-2 border-t border-gray-300">
        <p className="text-xs font-medium">Copyright © Amaya 2025</p>
      </footer>
    </div>
  );
};

export default Page;
