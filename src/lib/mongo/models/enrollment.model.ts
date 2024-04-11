import { Schema, model, models } from "mongoose";

export interface IEnrollment extends Document {
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
    semester: string,
    roomNumber: string,
    instructor: {
      _id: string,
      firstName: string,
      lastName: string,
    }
  };

  student: { 
    _id: string, 
    clerkId: string, 
    email: string, 
    username: string, 
    firstName: string, 
    lastName: string, 
    role: string
  };
}

const EnrollmentSchema = new Schema({
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  student: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Enrollment = models.Enrollment || model('Enrollment', EnrollmentSchema);

export default Enrollment;