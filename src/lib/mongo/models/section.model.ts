
import { Schema, model, models } from "mongoose";

export interface ISection extends Document {
  _id: string;
  sectionNumber: string;
  class: { _id: string, subject: string, number: string, name: string,  description: string} ;
  meetingDays: string;
  startTime: string;
  endTime: string;
  semester: string;
  roomNumber: string;
  instructor: { _id: string, firstName: string, lastName: string }
}

const SectionSchema = new Schema({
  sectionNumber: { type: String, required: true},
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  meetingDays: { type: String, default: 'TBD' },
  startTime: { type: String, default: 'TBD' },
  endTime: { type: String, default: 'TBD' },
  semester: { type: String, default: 'TBD' },
  roomNumber: {type: String },
  instructor: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Section = models.Section || model('Section', SectionSchema);

export default Section;