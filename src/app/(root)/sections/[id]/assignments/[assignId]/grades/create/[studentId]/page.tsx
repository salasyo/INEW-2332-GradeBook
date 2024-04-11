import CreateGradeForm from "@/components/shared/CreateGradeForm";
import { getAssignmentById } from "@/lib/actions/assignment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type CreateGradeProps = {
  params: {
    id: string,
    assignId: string,
    studentId: string
  }
}

const CreateGrade = async ({ params: { id, assignId, studentId } }: CreateGradeProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "instructor") {
    redirect("/");
  }

  const section = await getSectionById(id);
  const assignment = await getAssignmentById(assignId);
  const student = await getUserById(studentId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Grade</h3>
      </section>

      <div className="wrapper my-8">
        <p className="p-semibold-18">
          {assignment.name}
        </p>
        <p>
          Description: {assignment.description}
        </p>
        <p>
          Total Points: {assignment.totalPoints}
        </p>
        <p>
          Due Date: {assignment.dueDate}
        </p>
      </div>

      <h4 className="py-5 p-bold-24 text-center">
        Create Grade for {student.lastName}, {student.firstName}  
      </h4>

      <div className="wrapper my-8">
        <CreateGradeForm section={section} assignment={assignment} student={student} />
      </div>
    </>
  )
}

export default CreateGrade;