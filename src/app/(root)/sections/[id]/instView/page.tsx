import AssignmentList from "@/components/shared/AssignmentList";
import SectionViewModule from "@/components/shared/SectionViewModule";
import { Button } from "@/components/ui/button";
import { getAssignmentsBySection } from "@/lib/actions/assignment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

type InstViewSectionProps = {
  params: {
    id: string
  }
}

const InstViewSection = async ({ params: { id } }: InstViewSectionProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "instructor") {
    redirect("/");
  }

  const section = await getSectionById(id);
  const sectionId = section._id;

  const assignments = await getAssignmentsBySection({ sectionId });

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Class Section - Instructor View</h3>
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
        <AssignmentList  
          data={assignments?.data} 
          emptyTitle={"No Assignments Yet"} 
          emptyStateSubtext={"Create Some Assignments"}        
        />
      </div>

      <div className="flex flex-col flex-center gap-8 py-5">
        <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href={`/sections/${section._id}/assignments/create`}>
            Create New Assignment
          </Link>
        </Button>
      </div>

      <div className="py-5"></div>

      <h4 className="p-bold-24 text-center">
        Attendance 
      </h4>

      <div className="flex flex-col flex-center gap-8 py-5">
        <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href={`/sections/${section._id}/attendance/create`}>
            Take Attendance
          </Link>
        </Button>
      </div>

    </>
  )
}

export default InstViewSection