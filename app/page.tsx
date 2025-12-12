"use client";
import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  ArrowLeft,
  Loader2,
  CheckCircle,
  XCircle,
  Circle,
} from "lucide-react";
import AddStudent from "./components/AddStudent";
import Students from "./components/Students";
import { IStudent } from "./models/Student";

type AppView =
  | "EnterPin"
  | "Loading"
  | "StudentFound"
  | "StudentNotFound"
  | "AddStudent";

export default function Home() {
  const [id, setId] = useState(["", "", "", ""]);
  const [view, setView] = useState<AppView>("EnterPin");
  const [foundStudent, setFoundStudent] = useState<any | null>(null);
  const inputRefs: any = useRef([]);

  const statusText: Record<AppView, string> = {
    EnterPin: "Waiting for Input...",
    Loading: "Searching...",
    StudentFound: "Student Found",
    StudentNotFound: "Student Not Found",
    AddStudent: "Adding Student...",
  };

  const statusColor: Record<AppView, string> = {
    EnterPin: "text-slate-400",
    Loading: "text-blue-500",
    StudentFound: "text-green-600",
    StudentNotFound: "text-red-500",
    AddStudent: "text-blue-500",
  };

  const renderStatusDot = () => {
    switch (view) {
      case "Loading":
        return <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />;
      case "StudentFound":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "StudentNotFound":
        return <XCircle className="w-6 h-6 text-red-500" />;
      case "AddStudent":
        return <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />;
      default:
        return <Circle className="w-6 h-6 text-slate-400" />;
    }
  };

  const fetchStudentDetails = async (studentId: string) => {
    setView("Loading");
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idno: studentId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFoundStudent(result.data as IStudent);
        setView("StudentFound");
      } else if (response.status === 404) {
        setFoundStudent(null);
        setView("StudentNotFound");
      } else {
        setView("StudentNotFound");
      }
    } catch {
      setFoundStudent(null);
      setView("StudentNotFound");
    }
  };

  useEffect(() => {
    const userIdArray = id.filter(Boolean);

    if (userIdArray.length === 4) {
      fetchStudentDetails(userIdArray.join(""));
    }

    if (userIdArray.length === 0) {
      setView("EnterPin");
      setFoundStudent(null);
    }

    if (
      userIdArray.length > 0 &&
      userIdArray.length < 4 &&
      view !== "EnterPin"
    ) {
      setView("EnterPin");
      setFoundStudent(null);
    }
  }, [id]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newId = [...id];
    newId[index] = value;
    setId(newId);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !id[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resetPin = () => {
    setId(["", "", "", ""]);
    setFoundStudent(null);
    setView("EnterPin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 w-full text-center rounded-bl-full rounded-br-full">
        <h1 className="p-4 text-2xl sm:text-3xl font-semibold text-white">
          Student Attendance
        </h1>
      </header>

      {view === "StudentFound" && foundStudent ? (
        <div className="p-4">
          <button
            onClick={resetPin}
            className="flex items-center gap-2 px-4 py-2 mb-4 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <Students student={foundStudent } />
        </div>
      ) : view === "AddStudent" ? (
        <div className="p-4">
          <button
            onClick={resetPin}
            className="flex items-center gap-2 px-4 py-2 mb-4 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <AddStudent setCurrent={setView} />
        </div>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center px-4 space-y-6 sm:space-y-8">
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
                  className={`w-12 sm:w-14 h-12 sm:h-16 rounded-xl border-2 text-center text-2xl sm:text-3xl font-bold transition-all duration-200 outline-none ${
                    digit
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-slate-50 text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-md focus:-translate-y-1"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="w-full max-w-md">
            <button
              className="flex items-center justify-center bg-blue-500 text-white font-semibold w-full p-4 gap-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setView("AddStudent")}
            >
              <UserPlus />
              Add Student
            </button>
          </div>

          <div className="w-full max-w-md bg-slate-200 flex flex-col justify-center items-center py-4 rounded-md">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3">
              {renderStatusDot()}
            </div>
            <p className={`text-lg font-bold text-center ${statusColor[view]}`}>
              {statusText[view]}
            </p>
          </div>
        </main>
      )}

      <footer className="text-center p-2 border-t border-gray-300">
        <p className="text-xs font-medium">Copyright © Amaya 2025</p>
      </footer>
    </div>
  );
}
