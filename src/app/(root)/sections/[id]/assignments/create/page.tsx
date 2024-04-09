import CreateAssignmentForm from "@/components/shared/CreateAssignmentForm";
import { getSectionById } from "@/lib/actions/section.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type CreateAssignmentProps = {
  params: {
    id: string
  }
}

const CreateAssignment = async ({ params: { id } }: CreateAssignmentProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "instructor") {
    redirect("/");
  }

  console.log("sectionId = " + id);

  const section = await getSectionById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Assignment for {section.class.subject} {section.class.number}: {section.class.name} - {section.sectionNumber}</h3>
      </section>

      <div className="wrapper my-8">
        <h4 className="py-5 p-bold-24 text-center">
          Section Information
        </h4>
      
        <p className="py-3">
          Meeting Days: {section.meetingDays}
        </p>
        <p className="py-3">
          Meeting Time: {section.startTime} - {section.endTime}
        </p>
        <p className="py-3">
          Semester: {section.semester}
        </p>
        <p className="py-3">
          Room Number: {section.roomNumber}
        </p>
        <p className="py-3">
          Instructor: {section.instructor.lastName}, {section.instructor.firstName}
        </p>
      </div>

      <div className="wrapper my-8">
        <CreateAssignmentForm section={section} sectionId={id} />
      </div>
    </>
  )
}

export default CreateAssignment