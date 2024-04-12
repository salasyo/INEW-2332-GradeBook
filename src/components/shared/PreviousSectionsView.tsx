
import { IEnrollment } from "@/lib/mongo/models/enrollment.model"
import { IGrade } from "@/lib/mongo/models/grade.model"
import IndividualGradeStudentView from "./IndividualGradeStudentView"
import { ISection } from "@/lib/mongo/models/section.model"
import { getSectionById } from "@/lib/actions/section.actions"

type PreviousSectionsViewProps = {
  enrollments: IEnrollment[],
  grades: IGrade[],
  emptyTitle: string,
  emptyStateSubtext: string
}

const PreviousSectionsView = ({
  enrollments,
  grades,
  emptyTitle,
  emptyStateSubtext,
}: PreviousSectionsViewProps) => {

  const filterEnrollments = (enrollments: IEnrollment[]) => {
    let previousEnrollmentArray: IEnrollment[] = [];

    enrollments.map((enrollment) => {
      if (enrollment.section.semester == "FA-2023 (Aug 21 - Dec 7)") {
        previousEnrollmentArray.push(enrollment);
      }
    })

    return previousEnrollmentArray
  }

  const previousEnrollments = filterEnrollments(enrollments);

  return (
    <>
      {previousEnrollments.length > 0 ? (
        <div className="flex flex-col items-center gap-10">

          <ul className="grid w-full grid-cols-1 gap-5 xl:gap-10">
            {previousEnrollments.map(async (enrollment) => {

              const thisSection: ISection = await getSectionById(enrollment.section._id);

              return (
                <li key={enrollment._id} className="flex justify-center">
                  <div className="group relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all p-5">
                    <p className="p-semibold-18">
                        {enrollment.section.class.subject} {enrollment.section.class.number}: {enrollment.section.class.name}
                      </p>
                      <p>
                        Section Number: {enrollment.section.sectionNumber}
                      </p>
                      <p>
                        Meeting Days: {enrollment.section.meetingDays}
                      </p>
                      <p>
                        Meeting Time: {enrollment.section.startTime} - {enrollment.section.endTime}
                      </p>
                      <p>
                        Semester: {enrollment.section.semester}
                      </p>
                      <p>
                        Room Number: {enrollment.section.roomNumber}
                      </p>
                      <p>
                        Instructor: {enrollment.section.instructor.lastName}, {enrollment.section.instructor.firstName}
                      </p>

                      <div>
                        <IndividualGradeStudentView section={thisSection} grades={grades} />
                      </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default PreviousSectionsView