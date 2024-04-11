import { getGradeByAssignmentAndStudent } from "@/lib/actions/grade.actions"
import { IAssignment } from "@/lib/mongo/models/assignment.model"
import { ISection } from "@/lib/mongo/models/section.model"
import { IUser } from "@/lib/mongo/models/user.model"

type EnrolledViewAssignModuleProps = {
  section: ISection,
  assignment: IAssignment,
  student: IUser
}

const EnrolledViewAssignModule = async ({ section, assignment, student }: EnrolledViewAssignModuleProps) => {

  const grade = await getGradeByAssignmentAndStudent(assignment._id, student._id);
  const readableGrade = grade?.data;

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
        {student.firstName} {student.lastName}'s Current Grade for this Assignment: {readableGrade.length > 0 ? (`${readableGrade[0].percentageScore}%`) : ("Not Graded Yet") }
      </h4>
    </section>
  )
}

export default EnrolledViewAssignModule