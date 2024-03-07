import { z } from "zod"

export const sectionFormSchema = z.object({
  sectionNumber: z.string().max(6, 'Section number must be less than 3 characters'),
  classId: z.string(),
  meetingDays: z.string().max(10, 'Meeting days item must be less than 10 characters'),
  startTime: z.string().max(10, 'Start time item must be less than 10 characters'),
  endTime: z.string().max(10, 'End time item must be less than 10 characters'),
  startDate: z.date(),
  endDate: z.date(),
  roomNumber: z.string().max(7, 'Room number must be less than 7 characters'),
  instructorId: z.string()
})