import { Schema, model, models } from "mongoose";

export interface ISubject extends Document {
  _id: string;
  subjectAbbr: string;
}

const SubjectSchema = new Schema({
  subjectAbbr: { type: String, required: true },
})

const Subject = models.Subject || model('Subject', SubjectSchema);

export default Subject;