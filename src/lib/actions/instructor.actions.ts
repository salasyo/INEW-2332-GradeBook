"use server"

import { connectToDatabase } from "../mongo"
import Instructor from "../mongo/models/instructor.model";
import { handleError } from "../utils"

export const getAllInstructors = async () => {
  try {
    await connectToDatabase();

    const instructors = await Instructor.find();

    return JSON.parse(JSON.stringify(instructors));
  }
  catch (error) {
    handleError(error)
  }
}