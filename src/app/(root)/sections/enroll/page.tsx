
import EnrollmentCollection from "@/components/shared/EnrollmentCollection";
import { getAllSections, getSectionsBySemester } from "@/lib/actions/section.actions"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function EnrollInSections() {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const fall23SemSections = await getSectionsBySemester({ semester: "FA-2023 (Aug 21 - Dec 7)" });
  const spr24SemSections = await getSectionsBySemester({ semester: "SP-2024 (Jan 16 - May 9)" });
  const fall24SemSections = await getSectionsBySemester({ semester: "FA-2024 (Aug 26 - Dec 12)" });

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Enroll in Class Sections</h3>
      </section>

      <div className="py-5"></div>

      <h4 className="p-bold-24 text-center">
        Fall '23 (Aug 21, 2023 - Dec 7, 2023)
      </h4>

      <div className="py-5"></div>

      <div>
        <EnrollmentCollection 
          data={fall23SemSections?.data}
          emptyTitle="No Sections Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={100}
          page={1}
          totalPages={2}
        />
      </div>

      <div className="py-5"></div>

      <h4 className="p-bold-24 text-center">
        Spring '24 (Jan 16, 2024 - May 9, 2024)
      </h4>

      <div className="py-5"></div>

      <div>
        <EnrollmentCollection 
          data={spr24SemSections?.data}
          emptyTitle="No Sections Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={100}
          page={1}
          totalPages={2}
        />
      </div>

      <div className="py-5"></div>

      <h4 className="p-bold-24 text-center">
        Fall '24 (Aug 26, 2024 - Dec 12, 2024)
      </h4>

      <div className="py-5"></div>

      <div>
        <EnrollmentCollection 
          data={fall24SemSections?.data}
          emptyTitle="No Sections Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={100}
          page={1}
          totalPages={2}
        />
      </div>

      <div className="py-5"></div>
    </>
  )
}