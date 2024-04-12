import CumulativeGPAView from "@/components/shared/CumulativeGPAView";
import CurrentSectionsView from "@/components/shared/CurrentSectionsView";
import CurrentSemesterGPAView from "@/components/shared/CurrentSemesterGPAView";
import PreviousSectionsView from "@/components/shared/PreviousSectionsView";
import { getEnrollmentsByUser } from "@/lib/actions/enrollment.actions";
import { getGradesByStudent } from "@/lib/actions/grade.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IEnrollment } from "@/lib/mongo/models/enrollment.model";
import { IGrade } from "@/lib/mongo/models/grade.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
 
export default async function StudentProfile() {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "student") {
    redirect("/");
  }

  const userId = sessionClaims.metadata.userId;

  const student = await getUserById(userId);
  const grades = await getGradesByStudent(userId);

  const limit = 100;
  const page = 1;
  const enrollments = await getEnrollmentsByUser({ userId, limit, page });

 
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Your Academic Profile</h3>
      </section>

      <h4 className="py-5 p-bold-24 text-center">
        Your GPA for the Current Semester
      </h4>

      <div className="my-8 h3-bold text-center">
        <CurrentSemesterGPAView grades={grades?.data} enrollments={enrollments?.data} />
      </div>

      <h4 className="py-5 p-bold-24 text-center">
        Your Cumulative GPA
      </h4>

      <div className="my-8 h3-bold text-center">
        <CumulativeGPAView grades={grades?.data} enrollments={enrollments?.data}/>
      </div>

      <h4 className="py-5 p-bold-24 text-center">
        Your Current Sections
      </h4>

      <div className="wrapper">
        <CurrentSectionsView  
          grades={grades?.data} 
          enrollments={enrollments?.data} 
          emptyTitle="No Current Sections" 
          emptyStateSubtext="You are not currently enrolled" 
        />
      </div>

      <h4 className="py-5 p-bold-24 text-center">
        Your Previous Sections
      </h4>

      <div className="wrapper">
        <PreviousSectionsView 
          grades={grades?.data} 
          enrollments={enrollments?.data} 
          emptyTitle="No Previous Sections" 
          emptyStateSubtext="You were not previously enrolled" 
        />
      </div>

      
    </>
  );
}