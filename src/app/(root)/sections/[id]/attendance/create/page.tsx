//import React from 'react';
import AttendanceForm from "@/components/shared/AttendanceForm";
import { getEnrollmentsBySection } from "@/lib/actions/enrollment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { IEnrollment } from "@/lib/mongo/models/enrollment.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { StudentObject } from "../../../../../../../types";

type TakeAttendanceProps = {
  params: {
    id: string;
  }
}

const TakeAttendance = async ({ params: { id } }: TakeAttendanceProps) => {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "instructor") {
    redirect("/");
    return null; 
  }

  const section = await getSectionById(id);
  const enrollments = await getEnrollmentsBySection(id);
  const enrollmentList = enrollments?.data;

  let enrolledStudents: StudentObject[] = [];

  enrollmentList.map((enrollmentItem: IEnrollment) => {
    enrolledStudents.push({
      studentId: enrollmentItem.student._id,
      firstName: enrollmentItem.student.firstName,
      lastName: enrollmentItem.student.lastName
    });
  });

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Take Attendance for {section.class.subject} {section.class.number}: {section.class.name} - {section.sectionNumber}
        </h3>
      </section>
      <div className="container mx-auto my-8 p-4">
        <AttendanceForm enrolledStudents={enrolledStudents} section={section} sectionId={id} />
      </div>
    </>
  );
};

export default TakeAttendance; // Ensure this line is correct
