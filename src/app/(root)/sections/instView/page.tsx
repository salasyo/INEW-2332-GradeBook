import InstCollection from "@/components/shared/InstCollection";
import { getInstructorSections } from "@/lib/actions/section.actions";
import { ISection } from "@/lib/mongo/models/section.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function InstManageSections() {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "instructor") {
    redirect("/");
  }

  const currentInstructorId = "" + sessionClaims?.metadata.userId;

  const sections = await getInstructorSections({
    instructorId: currentInstructorId,
    page: 1,
    limit: 100
  });

  let fall23SemSections: ISection[] = []; 
  let spr24SemSections: ISection[] = []; 
  let fall24SemSections: ISection[] = [];

  sections?.data.map((section: ISection) => {
    if (section.semester == "FA-2023 (Aug 21 - Dec 7)") {
      fall23SemSections.push(section);
    }
    else if (section.semester == "SP-2024 (Jan 16 - May 9)") {
      spr24SemSections.push(section);
    }
    else if (section.semester == "FA-2024 (Aug 26 - Dec 12)") {
      fall24SemSections.push(section);
    }
  })

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Manage Class Sections</h3>
      </section>

      <div className="py-5"></div>

      <h4 className="p-bold-24 text-center">
        Fall '23 (Aug 21, 2023 - Dec 7, 2023)
      </h4>

      <div className="py-5"></div>

      <div>
        <InstCollection 
          sections={fall23SemSections}
          emptyTitle="No Sections Found"
          emptyStateSubtext="You have no assigned sections for this semester"
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
        <InstCollection 
          sections={spr24SemSections}
          emptyTitle="No Sections Found"
          emptyStateSubtext="You have no assigned sections for this semester"
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
        <InstCollection 
          sections={fall24SemSections}
          emptyTitle="No Sections Found"
          emptyStateSubtext="You have no assigned sections for this semester"
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