// models/Attendance.ts (Event Log)
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAttendance extends Document {
  idno: string;
  timestamp: Date;
}

const AttendanceSchema: Schema = new Schema<IAttendance>(
  {
    idno: {
      type: String,
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance: Model<IAttendance> =
  mongoose.models.Attendance ||
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default Attendance;
