"use server"

import { CreateAttendanceRecordParams } from "../../../types";
import { connectToDatabase } from "../mongo";
import Attendance from "../mongo/models/attendance.model";
import { handleError } from "../utils";

export const createAttendanceRecord = async ({ attendanceRecord }: CreateAttendanceRecordParams) => {
  try {
    await connectToDatabase();

    const newAttendanceRecord = await Attendance.create({ ...attendanceRecord, section: attendanceRecord.sectionId });

    return JSON.parse(JSON.stringify(newAttendanceRecord));
  }
  catch (error) {
    handleError(error);
  }
}