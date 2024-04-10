"use server"

import { CreateAssignmentParams, GetAssignmentsBySectionParams } from "../../../types"
import { connectToDatabase } from "../mongo";
import Assignment from "../mongo/models/assignment.model";
import Section from "../mongo/models/section.model";
import { handleError } from "../utils";

const populateAssignment = (query: any) => {
  return query
    .populate({ path: 'section', model: Section, select: '_id' })
}

export const createAssignment = async ({ assignment }: CreateAssignmentParams) => {
  try {
    await connectToDatabase();

    const newAssignment = await Assignment.create({ ...assignment, section: assignment.sectionId });

    return JSON.parse(JSON.stringify(newAssignment));
  }
  catch (error) {
    handleError(error);
  }
}

export const getAssignmentsBySection = async ({ sectionId }: GetAssignmentsBySectionParams) => {
  try {
    await connectToDatabase();

    const conditions = { section: sectionId };

    const assignmentsQuery = Assignment.find(conditions)
      .sort({ name: 'asc' })
      .skip(0)
      .limit(100);

    const selectedAssignments = await populateAssignment(assignmentsQuery);

    return {
      data: JSON.parse(JSON.stringify(selectedAssignments))
    };
  }
  catch (error) {
    handleError(error);
  }
}