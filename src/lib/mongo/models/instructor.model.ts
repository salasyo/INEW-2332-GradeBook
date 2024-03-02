import { Schema, model, models } from "mongoose";

export interface IInstructor extends Document {
  _id: string;
  firstName: string;
  lastName: string;
}

const InstructorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
})

const Instructor = models.Instructor || model('Instructor', InstructorSchema);

export default Instructor;