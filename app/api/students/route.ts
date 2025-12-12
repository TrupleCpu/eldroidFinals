import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import { put, del } from "@vercel/blob";
import Student, { IStudent } from "@/app/models/Student";

export async function POST(req: NextRequest) {
  await dbConnect();

  let studentData: Partial<IStudent> = {};
  let profile: File | null = null;
  let result;

  try {
    const formData = await req.formData();

    for (const [key, value] of formData.entries()) {
      if (key === "profile") {
        profile = value as File;
      } else {
        studentData[key as keyof IStudent] = value as any;
      }
    }

    if (
      !profile ||
      !studentData.firstname ||
      !studentData.lastname ||
      !studentData.course ||
      !studentData.level ||
      !studentData.idno
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required data or avatar file." },
        { status: 400 }
      );
    }

    const pathname = `profile/${Date.now()}-${profile.name.replace(
      /\s/g,
      "-"
    )}`;

    result = await put(pathname, profile, {
      access: "public",
      contentType: profile.type,
      addRandomSuffix: false,
    });

    studentData.profile = result.url;
  } catch (error) {
    console.error("Error during file parsing or blob upload:", error);
    return NextResponse.json(
      { success: false, message: "File upload failed." },
      { status: 500 }
    );
  }

  try {
    const newStudent: IStudent = await Student.create(studentData);

    return NextResponse.json(
      {
        success: true,
        data: newStudent.toObject(),
      },
      { status: 201 }
    );
  } catch (error) {
    if (result) {
      console.warn(
        `MongoDB save failed. File uploaded to Vercel Blob: ${result.url}`
      );
    }

    let message = "Failed to create student.";
    if (error instanceof Error && "code" in error && error.code === 11000) {
      message = "Student ID or Email already exists.";
      return NextResponse.json({ success: false, message }, { status: 409 });
    }

    return NextResponse.json({ success: false, message }, { status: 500 });
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
    const students: IStudent[] = await Student.find({}).lean();

    return NextResponse.json(
      { success: true, data: students },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve students." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const idno = url.searchParams.get("idno");

  if (!idno) {
    return NextResponse.json(
      { message: "Student ID (idno) is required." },
      { status: 400 }
    );
  }

  try {
    const studentToDelete: IStudent | null = await Student.findOne({
      idno: idno,
    });

    if (!studentToDelete) {
      return NextResponse.json(
        { success: false, message: `Student with ID ${idno} not found.` },
        { status: 404 }
      );
    }

    const blobPathname = studentToDelete.profile;

    if (blobPathname) {
      try {
        await del(blobPathname);
        console.log(`Successfully deleted blob for ID: ${idno}`);
      } catch (blobError) {
        console.warn(
          `Vercel Blob deletion failed for ID ${idno}. Continuing database cleanup.`
        );
      }
    }

    await studentToDelete.deleteOne({ idno: idno });

    //await Attendance.deleteMany({ idno: idno });

    return NextResponse.json(
      {
        success: true,
        message: `Student ${idno}, logs, and image successfully deleted.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting records for ID ${idno}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during deletion process.",
      },
      { status: 500 }
    );
  }
}
