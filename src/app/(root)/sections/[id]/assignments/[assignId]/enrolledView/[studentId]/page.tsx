import EnrolledViewAssignModule from "@/components/shared/EnrolledViewAssignModule";
import { getAssignmentById } from "@/lib/actions/assignment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type EnrolledViewAssignmentProps = {
  params: {
    id: string,
    assignId: string,
    studentId: string
  }
}

const EnrolledViewAssignment = async ({ params: { id, assignId, studentId } }: EnrolledViewAssignmentProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const section = await getSectionById(id);
  const assignment = await getAssignmentById(assignId);
  const student = await getUserById(studentId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">View Assignment - Enrolled View</h3>
      </section>

      <div className="wrapper my-8">
        <EnrolledViewAssignModule section={section} assignment={assignment} student={student} />
      </div>
    </>
  )
}

export default EnrolledViewAssignment