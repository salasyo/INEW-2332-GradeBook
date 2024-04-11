"use server"

import { CreateGradeParams } from "../../../types";
import { connectToDatabase } from "../mongo";
import Grade from "../mongo/models/grade.model";
import { handleError } from "../utils";
import { getAssignmentById } from "./assignment.actions";

export const createGrade = async (grade: CreateGradeParams) => {
  try {
    await connectToDatabase();

    const newGrade = await Grade.create({
      ...grade,
      assignment: grade.assignmentId,
      student: grade.studentId
    })

    return JSON.parse(JSON.stringify(newGrade));

  } catch (error) {
    handleError(error)
  }
}