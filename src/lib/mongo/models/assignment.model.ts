import { Schema, model, models } from "mongoose";

export interface IAssignment extends Document {
  _id: string;

  section: { 
    _id: string, 
    sectionNumber: string, 
    class: {
      _id: string,
      subject: string,
      number: string,
      name: string,
    },  
    meetingDays: string,
    startTime: string,
    endTime: string,
    startDate: Date,
    endDate: Date,
    roomNumber: string,
    instructor: {
      _id: string,
      firstName: string,
      lastName: string,
    }
  };

  name: string;
  description: string;
  totalPoints: string;
  dueDate: string
}

const AssignmentSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  name: { type: String, required: true },
  description: { type: String },
  totalPoints: { type: String, required: true },
  dueDate: { type: String, required: true }
})

const Assignment = models.Assignment || model('Assignment', AssignmentSchema);

export default Assignment;