"use server"

import { connectToDatabase } from "../mongo"
import Class from "../mongo/models/class.model";
import { handleError } from "../utils"

export const getAllClasses = async () => {
  try {
    await connectToDatabase();

    const classes = await Class.find();

    return JSON.parse(JSON.stringify(classes))
  }
  catch (error) {
    handleError(error)
  }
}