import { Schema, model, models } from "mongoose";

export interface IClass extends Document {
  _id: string;
  subject: string;
  number: string;
  name: string;
  description: string;
}

const ClassSchema = new Schema({
  subject: { type: String, required: true },
  number: { type: String, required: true },
  name: { type: String, required: true, unique: true},
  description: { type: String }
})

const Class = models.Class || model('Class', ClassSchema);

export default Class;