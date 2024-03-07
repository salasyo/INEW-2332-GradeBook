import { Schema, model, models } from "mongoose";

export interface IClass extends Document {
  _id: string;
  abbreviation: string;
  name: string;
  description: string;
}

const ClassSchema = new Schema({
  abbreviation: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true},
  description: { type: String }
})

const Class = models.Class || model('Class', ClassSchema);

export default Class;