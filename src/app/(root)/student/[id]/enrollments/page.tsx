import StudentEnrollmentCollection from "@/components/shared/StudentEnrollmentCollection";
import { getEnrollmentsByUser } from "@/lib/actions/enrollment.actions";
import { getSectionById } from "@/lib/actions/section.actions";
import { IEnrollment } from "@/lib/mongo/models/enrollment.model";
import { ISection } from "@/lib/mongo/models/section.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function createSectionObjectWithId(sectionId: string) {
  const section = await getSectionById(sectionId);

  return section;
}


export default async function StudentEnrollments() {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const userId = sessionClaims.metadata.userId;
  const limit = 100;
  const page = 1;
  const enrollments = await getEnrollmentsByUser({ userId, limit, page });

  let enrolledSectionIds: string[] = [];
  
  enrollments?.data.map((enrollment: IEnrollment) => {
    let currentSectionId = enrollment.section._id;

    enrolledSectionIds.push(currentSectionId);
  });

  let enrolledSections: ISection[] = [];

  for (let i = 0; i < enrolledSectionIds.length; i++) {
    const currentSection = createSectionObjectWithId(enrolledSectionIds[i]);

    enrolledSections.push(await currentSection);
  }

  let fall23SemSections: ISection[] = []; 
  let spr24SemSections: ISection[] = []; 
  let fall24SemSections: ISection[] = [];

  enrolledSections.map((enrolledSection) => {
    if (enrolledSection.semester == "FA-2023 (Aug 21 - Dec 7)") {
      fall23SemSections.push(enrolledSection);
    }
    else if (enrolledSection.semester == "SP-2024 (Jan 16 - May 9)") {
      spr24SemSections.push(enrolledSection);
    }
    else if (enrolledSection.semester == "FA-2024 (Aug 26 - Dec 12)") {
      fall24SemSections.push(enrolledSection);
    }
  })
 
  return (
    <>
      <section className="bg-primary-50 bg-contain py-5 md:py-10">
        <div className="wrapper gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold">Your Enrollments</h1>

            <h4 className="p-bold-24 text-center">
              Fall '23 (Aug 21, 2023 - Dec 7, 2023)
            </h4>
            
            <div>
              <StudentEnrollmentCollection sections={fall23SemSections} studentId={userId} emptyTitle="No enrollments" emptyStateSubtext="You were not enrolled during this semester" />
            </div>

            <h4 className="p-bold-24 text-center">
              Spring '24 (Jan 16, 2024 - May 9, 2024)
            </h4>

            <div>
              <StudentEnrollmentCollection 
                sections={spr24SemSections} 
                studentId={userId} 
                emptyTitle="No enrollments" 
                emptyStateSubtext="You can still enroll in class sections for this semester if the enrollment deadline has not passed!" 
              />
            </div>

            <h4 className="p-bold-24 text-center">
              Fall '24 (Aug 26, 2024 - Dec 12, 2024)
            </h4>

            <div>
              <StudentEnrollmentCollection sections={fall24SemSections} studentId={userId} emptyTitle="No enrollments" emptyStateSubtext="It's not too late to enroll in class sections for this semester!" />
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}

