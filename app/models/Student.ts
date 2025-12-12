import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface IStudent extends Document {
  student?: any;
  idno: string;
  lastname: string;
  firstname: string;
  course: string;
  level: string;
  profile: string;
}

const StudentSchema: Schema = new Schema<IStudent>({
  idno: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  course: { type: String, required: true },
  level: { type: String, required: true },
  profile: { type: String, required: true },
});

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
