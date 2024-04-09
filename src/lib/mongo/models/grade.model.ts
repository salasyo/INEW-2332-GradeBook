import { Schema, model, models } from "mongoose";

export interface IGrade extends Document {
  _id: string;

  assignment: { 
    _id: string, 
    section: {
      _id: string;
      sectionNumber: string;
      subjectAbbr: string;
      class: { _id: string, subject: string, number: string, name: string,  description: string } ;
      meetingDays: string;
      startTime: string;
      endTime: string;
      semester: string;
      roomNumber: string;
      instructor: { _id: string, firstName: string, lastName: string }
    },

    name: string,
    description: string,
    totalPoints: string,
    dueDate: string
  };

  student: {
    _id: string, firstName: string, lastName: string
  };
  
  percentageScore: string
}

const GradeSchema = new Schema({
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  percentageScore: { type: String, required: true }
})

const Grade = models.Grade || model('Grade', GradeSchema);

export default Grade;