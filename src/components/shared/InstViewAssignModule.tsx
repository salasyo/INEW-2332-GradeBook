import { IAssignment } from "@/lib/mongo/models/assignment.model"
import { IEnrollment } from "@/lib/mongo/models/enrollment.model"
import { ISection } from "@/lib/mongo/models/section.model"
import Link from "next/link"

type InstViewAssignModuleProps = {
  section: ISection,
  enrollments: IEnrollment[],
  assignment: IAssignment
}

const InstViewAssignModule = ({ section, enrollments, assignment }: InstViewAssignModuleProps) => {

  return (
    <section className="wrapper max-w-[500px]">

      <h4 className="py-5 p-bold-24 text-center">
        {section.class.subject} {section.class.number}: {section.class.name} - {section.sectionNumber}
      </h4>
        
      <p className="py-3">
        Assignment: {assignment.name}
      </p>
      <p className="py-3">
        Description: {assignment.description}
      </p>
      <p className="py-3">
        Total Points: {assignment.totalPoints}
      </p>
      <p className="py-3">
        Due Date: {assignment.dueDate}
      </p>

      <h4 className="py-5 p-bold-24 text-center">
        Assign Student Grades
      </h4>

      <div>
        {enrollments.length > 0 ? (
          <div className="flex flex-col items-center gap-10">
            <ul className="grid w-full grid-cols-1 gap-5 xl:gap-10">
              {enrollments.map((enrollment) => {
                return (
                  <li key={enrollment._id} className="flex justify-center">
                    <div className="group relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg p-5">
                      <Link
                        href={`/sections/${section._id}/assignments/${assignment._id}/grades/create/${enrollment.student._id}`}
                      >
                        <p className="p-semibold-18">
                          {enrollment.student.lastName}, {enrollment.student.firstName}
                        </p>
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
            <h3 className="p-bold-20 md:h5-bold">No students enrolled</h3>
            <p className="p-regular-14">Check back soon</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default InstViewAssignModule