"use client"

import { ISection } from "@/lib/mongo/models/section.model"
import { formatDateTime } from "@/lib/utils"
import { Button } from "../ui/button"
import { IUser } from "@/lib/mongo/models/user.model"
import { createEnrollment, getEnrollmentsByUser } from "@/lib/actions/enrollment.actions"
import { IEnrollment } from "@/lib/mongo/models/enrollment.model"

type SectionEnrollmentModuleProps = {
  section: ISection,
  sectionId: string,
  user: IUser,
  userId: string,
  data: IEnrollment[]
}

const SectionEnrollmentModule = ({ section, sectionId, user, userId, data }: SectionEnrollmentModuleProps) => {

  const findMatch = () => {
    var matchFound = false;

    data.map((enrollment) => {
      
      if (enrollment.section._id === sectionId && enrollment.student._id === userId ) {
        matchFound = true;
      }
    });

    return matchFound;
  };

  const isDisabled = findMatch();

  async function handleClick() {
    try {

      const enrollmentProps = {
        sectionId: sectionId,
        studentId: userId,
      }
      
      const newEnrollment = await createEnrollment(enrollmentProps);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="wrapper max-w-[500px]">

        <h4 className="py-5 p-bold-24 text-center">
          {section.class.abbreviation}: {section.class.name} - {section.sectionNumber}
        </h4>
        
        <p className="py-3 italic">
          Description: {section.class.description}
        </p>

        <p className="py-3">
          Meeting Days: {section.meetingDays}
        </p>
        <p className="py-3">
          Meeting Time: {section.startTime} - {section.endTime}
        </p>
        <p className="py-3">
          Start/End Dates: {formatDateTime(section.startDate).dateOnly} - {formatDateTime(section.endDate).dateOnly}
        </p>
        <p className="py-3">
          Room Number: {section.roomNumber}
        </p>
        <p className="py-3">
          Instructor: {section.instructor.lastName}, {section.instructor.firstName}
        </p>

        <Button 
          type="submit" 
          size="lg" 
          disabled={findMatch()}
          className="button w-full px-3"
          onClick={handleClick}
        >
          {findMatch() ? ('Already Enrolled') : ('Enroll')}
        </Button>
      </section>
  )
}

export default SectionEnrollmentModule