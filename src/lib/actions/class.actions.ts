"use server"

import { GetClassesBySubjectParams } from "../../../types";
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

export const getClassesBySubject = async ({ subject, limit = 10, page }: GetClassesBySubjectParams) => {
  try {
    await connectToDatabase();

    const conditions = { subject: subject };

    const selectedClasses = await Class.find(conditions)
      .limit(limit);

    return JSON.parse(JSON.stringify(selectedClasses))
  }
  catch (error) {
    handleError(error);
  }
}
