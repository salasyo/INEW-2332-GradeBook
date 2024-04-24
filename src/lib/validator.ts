import { z } from "zod"
import { Status } from "../../types"

export const sectionFormSchema = z.object({
  sectionNumber: z.string(),
  subjectAbbr: z.string(),
  classId: z.string(),
  meetingDays: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  semester: z.string(),
  roomNumber: z.string(),
  instructorId: z.string()
})

export const userFormSchema = z.object({
  clerkId: z.string(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string()
})

export const newUserFormSchema = z.object({
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
})

export const newAssignmentFormSchema = z.object({
  section: z.string(),
  name: z.string(),
  description: z.string(),
  totalPoints: z.string(),
  dueDate: z.string()
})

export const newGradeFormSchema = z.object({
  assignment: z.string(),
  student: z.string(),
  section: z.string(),
  pointsEarned: z.string()
})

export const newAttendanceRecordSchema = z.object({
  date: z.date(),
  className: z.string(),
  classAbbr: z.string(),
  classNumber: z.string(),
  sectionNumber: z.string(),
  records: z.array(z.object({
    status: z.enum([Status.Present, Status.Absent, Status.Tardy, Status.Excused]),
  })),
});