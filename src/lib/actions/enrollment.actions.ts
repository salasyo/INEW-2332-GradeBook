"use server"

import { CreateEnrollmentParams, GetEnrollmentsByUserParams } from "../../../types"
import { connectToDatabase } from "../mongo";
import Class from "../mongo/models/class.model";
import Enrollment from "../mongo/models/enrollment.model";
import Section from "../mongo/models/section.model";
import User from "../mongo/models/user.model";
import { handleError } from "../utils";

export const createEnrollment = async (enrollment: CreateEnrollmentParams) => {
  try {
    await connectToDatabase();

    const newEnrollment = await Enrollment.create({
      ...enrollment,
      section: enrollment.sectionId,
      student: enrollment.studentId,
    })

    return JSON.parse(JSON.stringify(newEnrollment));

  } catch (error) {
    handleError(error)
  }
}

export const getEnrollmentsByUser = async ({ userId, limit = 10, page = 1 }: GetEnrollmentsByUserParams) => {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { student: userId };

    const enrollments = await Enrollment.distinct('section._id')
      .find(conditions)
      //.skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'section',
        model: Section,
        populate: {
            path: 'class',
            model: Class,
            select: '_id subject number name'
          },
      })
      .populate({
        path: 'section',
        model: Section,
        populate: {
            path: 'instructor',
            model: User,
            select: '_id firstName lastName'
          }
      })
      .populate({
        path: 'student',
        model: User,
        select: '_id firstName lastName'
      })

    const enrollmentsCount = await Enrollment.distinct('section._id').countDocuments(conditions);

    return { data: JSON.parse(JSON.stringify(enrollments)) }
  } catch (error) {
    handleError(error)
  }
}

export const getEnrollmentsBySection = async (sectionId: string) => {
  try {
    await connectToDatabase();

    const conditions = { section: sectionId };

    const enrollments = await Enrollment.distinct('student._id')
      .find(conditions)
      .limit(30)
      .populate({
        path: 'section',
        model: Section,
        populate: {
          path: 'class',
          model: Class,
          select: '_id subject number name'
        }
      })
      .populate({
        path: 'section',
        model: Section,
        populate: {
          path: 'instructor',
          model: User,
          select: '_id firstName lastName'
        }
      })
      .populate({
        path: 'student',
        model: User,
        select: '_id firstName lastName'
      })

    return { data: JSON.parse(JSON.stringify(enrollments)) };
  }
  catch (error) {
    handleError(error);
  }
}