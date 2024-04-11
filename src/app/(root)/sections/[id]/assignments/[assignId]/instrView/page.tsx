import InstViewAssignModule from "@/components/shared/InstViewAssignModule";
import { getAssignmentById } from "@/lib/actions/assignment.actions";
import { getEnrollmentsBySection } from "@/lib/actions/enrollment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type InstViewAssignmentProps = {
  params: {
    id: string,
    assignId: string
  }
}

const InstViewAssignment = async ({ params: { id, assignId } }: InstViewAssignmentProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "instructor") {
    redirect("/");
  }

  const section = await getSectionById(id);
  const assignment = await getAssignmentById(assignId);
  const enrollments = await getEnrollmentsBySection(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">View Assignment - Instructor View</h3>
      </section>

      <div className="wrapper my-8">
        <InstViewAssignModule section={section} enrollments={enrollments?.data} assignment={assignment} />
      </div>
    </>
  )
}

export default InstViewAssignment