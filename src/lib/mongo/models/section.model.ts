
import { Schema, model, models } from "mongoose";

export interface ISection extends Document {
  _id: string;
  sectionNumber: string;
  class: { _id: string, abbreviation: string, name: string,  description: string} ;
  meetingDays: string;
  startTime: string;
  endTime: string;
  startDate: Date;
  endDate: Date;
  roomNumber: string;
  instructor: { _id: string, firstName: string, lastName: string }

}

const SectionSchema = new Schema({
  sectionNumber: { type: String, required: true},
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  meetingDays: { type: String, default: 'TBD' },
  startTime: { type: String, default: 'TBD' },
  endTime: { type: String, default: 'TBD' },
  startDate: { type: Date, default: Date.now},
  endDate: { type: Date, default: Date.now},
  roomNumber: {type: String },
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' }
})

const Section = models.Section || model('Section', SectionSchema);

export default Section;