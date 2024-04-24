
import AssignmentListStudent from "@/components/shared/AssignmentListStudent";
import SectionViewModule from "@/components/shared/SectionViewModule";
import { getAssignmentsBySection } from "@/lib/actions/assignment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type EnStudentViewSectionProps = {
  params: {
    id: string,
    studentId: string,
  }
}

const EnStudentViewSection = async ({ params: { id, studentId } }: EnStudentViewSectionProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const section = await getSectionById(id);
  const sectionId = section._id;

  const student = await getUserById(studentId);

  const assignments = await getAssignmentsBySection({ sectionId });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">View Section - Enrolled View</h3>
      </section>

      <div className="wrapper my-8">
        <SectionViewModule 
          section={section} 
          sectionId={section._id} 
        />
      </div>

      <h4 className="py-5 p-bold-24 text-center">
        Assignment List  
      </h4>

      <div>
        <AssignmentListStudent 
          student={student}
          assignments={assignments?.data} 
          emptyTitle={"No Assignments Yet"} 
          emptyStateSubtext={"Check Back Later"}        
        />
      </div>
    </>
  )
}

export default EnStudentViewSection;