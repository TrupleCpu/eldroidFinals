import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Student, { IStudent } from "@/app/models/Student";
import Attendance from "@/app/models/Attendance";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed." },
      { status: 500 }
    );
  }
  let requestBody: { idno?: string };
  try {
    requestBody = await req.json();
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Invalid JSON format." },
      { status: 400 }
    );
  }

  const { idno } = requestBody;

  if (!idno) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing student ID number (idno) in request body.",
      },
      { status: 400 }
    );
  }

  try {
    const student: IStudent | null = await Student.findOne({
      idno: idno,
    }).lean();

    if (!student) {
      return NextResponse.json(
        { success: false, message: `Student with ID ${idno} not found.` },
        { status: 404 }
      );
    }

    await Attendance.create({
      idno: student.idno,
      timestamp: new Date(),
    });
    return NextResponse.json({ success: true, data: student }, { status: 200 });
  } catch (error) {
    console.error(`Error finding student with ID ${idno}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while retrieving student.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed." },
      { status: 500 }
    );
  }
  try {
    const attendees = await Attendance.aggregate([
      { $sort: { timestamp: -1 } },

      {
        $lookup: {
          from: "students",
          localField: "idno",
          foreignField: "idno",
          as: "studentDetails",
        },
      },

      { $unwind: "$studentDetails" },

      {
        $project: {
          _id: 0,
          idno: "$idno",
          timestamp: "$timestamp",
          lastname: "$studentDetails.lastname",
          firstname: "$studentDetails.firstname",
          profile: "$studentDetails.profile",
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        data: attendees,
        count: attendees.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attendees:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve attendance records." },
      { status: 500 }
    );
  }
}
