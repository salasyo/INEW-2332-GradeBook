import { Schema, model, models } from "mongoose";

export interface IAttendance extends Document {
  _id: string;
  date: Date;

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

  className: string;
  classAbbr: string;
  classNumber: string;
  sectionNumber: string;
  records: [{
    _id: string,
    studentId: string,
    firstName: string,
    lastName: string,
    status: string
  }]
}

const AttendanceSchema = new Schema({
  date: { type: Date, default: Date.now },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
  className: { type: String, required: true },
  classAbbr: { type: String, required: true },
  classNumber: { type: String, required: true },
  sectionNumber: { type: String, required: true },
  records: [{
    studentId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    status: { type: String }
  }]
})

const Attendance = models.Attendance || model('Attendance', AttendanceSchema);

export default Attendance;
