"use client";
import React from "react";
import { IStudent } from "../models/Student";

const Students: React.FC<IStudent> = ( stud ) => {
  const student = stud.student;
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6">
        <div className="flex justify-center">
          <img
            src={student.profile}
            alt="Student"
            className="w-32 h-32 object-cover border rounded-md shadow"
          />
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-2 border-b">
            <div className="p-3 font-semibold border-r">IDNO</div>
            <div className="p-3">{student.idno}</div>
          </div>

          <div className="grid grid-cols-2 border-b">
            <div className="p-3 font-semibold border-r">LASTNAME</div>
            <div className="p-3">{student.lastname}</div>
          </div>

          <div className="grid grid-cols-2 border-b">
            <div className="p-3 font-semibold border-r">FIRSTNAME</div>
            <div className="p-3">{student.firstname}</div>
          </div>

          <div className="grid grid-cols-2 border-b">
            <div className="p-3 font-semibold border-r">COURSE</div>
            <div className="p-3">{student.course}</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="p-3 font-semibold border-r">LEVEL</div>
            <div className="p-3">{student.level}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Students;
