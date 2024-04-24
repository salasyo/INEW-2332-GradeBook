"use server"

import { CreateSectionParams, GetAllSectionsParams, GetInstructorSectionsParams } from "../../../types"
import { connectToDatabase } from "../mongo";
import Section from "../mongo/models/section.model";
import { handleError } from "../utils"
import Class from "../mongo/models/class.model";
import User from "../mongo/models/user.model";

const populateSection = (query: any) => {
  return query
    .populate({ path: 'class', model: Class, select: '_id subject number name description' })
    .populate({ path: 'instructor', model: User, select: '_id firstName lastName' })
}

export const createSection = async ({ section }: CreateSectionParams) => {
  try {
    await connectToDatabase();

    const newSection = await Section.create({ ...section, class: section.classId, instructor: section.instructorId });

    return JSON.parse(JSON.stringify(newSection));
  }
  catch (error) {
    handleError(error);
  }

}

export const getAllSections = async ({ query, limit = 6, page, classType }: GetAllSectionsParams) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const sectionsQuery = Section.find(conditions)
      .sort({ sectionNumber: 'asc' })
      .skip(0)
      .limit(limit);

    const sections = await populateSection(sectionsQuery);
    const sectionsCount = await Section.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(sections)),
      totalPages: Math.ceil(sectionsCount / limit),
      
    } 
  }
  catch (error) {
    handleError(error);
  }

}

export const getSectionById = async (sectionId: string) => {
  try {
    await connectToDatabase();

    const section = await populateSection(Section.findById(sectionId));

    if (!section) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(section));
  }
  catch (error) {
    handleError(error);
  }
}

export const getInstructorSections = async ({ instructorId, limit, page }: GetInstructorSectionsParams) => {
  try {

    await connectToDatabase();

    const conditions = { instructor: instructorId };

    const sectionsQuery = Section.find(conditions)
      .sort({ sectionNumber: 'asc' })
      .skip(0)
      .limit(limit);

    const sections = await populateSection(sectionsQuery);

    return { 
      data: JSON.parse(JSON.stringify(sections))
    };

  } catch (error) {
    handleError(error);
  }
}