"use client";

import { User, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [students, setStudents] = useState([
    {
      id: "1000",
      lastName: "DURANO",
      firstName: "DENNIS",
      course: "BSCS",
      level: "3",
      photoUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "1001",
      lastName: "SANTOS",
      firstName: "MARIA",
      course: "BSIT",
      level: "2",
      photoUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "1002",
      lastName: "REYES",
      firstName: "JOSEPH",
      course: "BSCS",
      level: "4",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
  ]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/students");
  //       const data = await res.json();

  //       console.log(data);
  //       setStudents(data);
  //     } catch (error) {
  //       console.log("Fetch error:", error);
  //     }
  //   };
  //     fetchData()

  // }, []);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    studentId: "",
  });

  const openDeleteModal = (id: string) => {
    setDeleteModal({ open: true, studentId: id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, studentId: "" });
  };

  const confirmDelete = () => {
    setStudents(students.filter((s) => s.id !== deleteModal.studentId));
    closeDeleteModal();
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
                LASTNAME
              </th>
              <th className="p-3 text-left font-bold border-r border-gray-300">
                FIRSTNAME
              </th>
              <th className="p-3 text-center font-bold border-r border-gray-300 w-24">
                COURSE
              </th>
              <th className="p-3 text-center font-bold border-r border-gray-300 w-20">
                LEVEL
              </th>
              <th className="p-3 text-center font-bold w-32">ACTION</th>
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
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                          <User size={48} />
                        </div>
                      )}
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
                      onClick={() => openDeleteModal(student.id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-sm text-sm transition"
                    >
                      <Trash2 size={16} />
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-12 text-center text-gray-500">
                  No students registered.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {deleteModal.open && (
          <>
            <motion.div
              className="fixed  bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Delete Student</h2>
                  <button onClick={closeDeleteModal}>
                    <X className="text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this student record? This
                  action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-0 w-full text-center p-2 border-t border-gray-300">
        <p className="text-xs font-medium">Copyright © Amaya 2025</p>
      </footer>
    </div>
  );
};

export default Page;
