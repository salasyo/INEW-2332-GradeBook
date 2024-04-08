"use server"

import { connectToDatabase } from "../mongo"
import Subject from "../mongo/models/subject.model";
import { handleError } from "../utils"

export const getAllSubjects = async () => {
  try {
    await connectToDatabase();

    const subjects = await Subject.find();

    return JSON.parse(JSON.stringify(subjects))
  }
  catch (error) {
    handleError(error)
  }
}