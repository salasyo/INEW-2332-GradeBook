import SectionEnrollmentModule from "@/components/shared/SectionEnrollmentModule";
import { getEnrollmentsByUser } from "@/lib/actions/enrollment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


type ViewSectionProps = {
  params: {
    id: string
  }
}

const ViewSection = async ({ params: { id } }: ViewSectionProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const thisUser = await currentUser();
  const usableUserId = thisUser ? ("" + thisUser.publicMetadata.userId) : ("");
  const user = await getUserById(usableUserId);
  const userId = user ? ("" + user._id) : ("");

  const section = await getSectionById(id);
  
  const page = 1;
  const limit = 10;

  const userEnrolledSections = await getEnrollmentsByUser({userId, limit, page});

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Enroll in Class Section</h3>
      </section>

      <div className="wrapper my-8">
        <SectionEnrollmentModule 
          section={section} 
          sectionId={section._id} 
          user={user} 
          userId={userId} 
          data={userEnrolledSections?.data}/>
      </div>

      
    </>
  )
}

export default ViewSection