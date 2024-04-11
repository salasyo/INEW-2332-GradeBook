import StudentEnrollmentCollection from "@/components/shared/StudentEnrollmentCollection";
import { Button } from "@/components/ui/button";
import { getEnrollmentsByUser } from "@/lib/actions/enrollment.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EndpointApiResponseProcessor } from "svix/dist/openapi/apis/EndpointApi";
 
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
 
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold">Your Enrollments</h1>
            <div>
              <p className="flex-center p-regular-20 md:p-regular-24">
                Here are all the courses you are enrolled in:
              </p>
            </div>
            
            <div>
              <StudentEnrollmentCollection enrollments={enrollments?.data} emptyTitle="No enrollments" emptyStateSubtext="Enroll in some class sections" />
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}