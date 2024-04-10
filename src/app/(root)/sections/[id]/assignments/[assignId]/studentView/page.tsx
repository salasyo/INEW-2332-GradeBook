import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type StudentViewAssignmentProps = {
  params: {
    id: string,
    assignId: string
  }
}

const StudentViewAssignment = async ({ params: { id, assignId } }: StudentViewAssignmentProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  //const assignment = await getSectionById(id);

  console.log("sectionId = " + id + " assignmentId = " + assignId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">View Assignment - Student View</h3>
      </section>

      <div className="wrapper my-8">
        View Assignment
      </div>

      
    </>
  )
}

export default StudentViewAssignment