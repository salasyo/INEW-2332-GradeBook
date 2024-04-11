"use server"

import { CreateGradeParams } from "../../../types";
import { connectToDatabase } from "../mongo";
import Assignment from "../mongo/models/assignment.model";
import Grade from "../mongo/models/grade.model";
import User from "../mongo/models/user.model";
import { handleError } from "../utils";

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

export const getGradeByAssignmentAndStudent = async (assignmentId: string, studentId: string) => {
  try {
    await connectToDatabase();

    const conditions = {
      assignment: assignmentId,
      student: studentId
    }

    const grade = await Grade.find(conditions)
      .limit(1)
      .populate({
        path: 'assignment',
        model: Assignment,
        select: '_id name description totalPoints dueDate'
      })
      .populate({
        path: 'student',
        model: User,
        select: '_id firstName lastName'
      })

    return { data: JSON.parse(JSON.stringify(grade)) };
  }
  catch (error) {
    handleError(error);
  }
}

export const getGradesByStudent = async (studentId: string) => {
  try {
    await connectToDatabase();

    const conditions = {
      student: studentId
    }

    const grades = await Grade.find(conditions)
      .limit(500)
      .populate({
        path: 'assignment',
        model: Assignment,
        select: '_id name description totalPoints dueDate'
      })
      .populate({
        path: 'student',
        model: User,
        select: '_id firstName lastName'
      });

    return { data: JSON.parse(JSON.stringify(grades)) };
  }
  catch (error) {
    handleError(error);
  }
}