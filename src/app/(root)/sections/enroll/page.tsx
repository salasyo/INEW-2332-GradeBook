
import EnrollmentCollection from "@/components/shared/EnrollmentCollection";
import { getAllSections } from "@/lib/actions/section.actions"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function EnrollInSections() {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const sections = await getAllSections({
    query: '',
    classType: '',
    page: 1,
    limit: 100
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Enroll in Class Sections</h3>
      </section>

      <div>
        <EnrollmentCollection 
          data={sections?.data}
          emptyTitle="No Sections Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={100}
          page={1}
          totalPages={2}
        />
      </div>
    </>
  )
}