import UserCollection from "@/components/shared/UserCollection";
import { getAllUsers } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function UserManagement() {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  const users = await getAllUsers({
    query: '',
    userType: '',
    page: 1,
    limit: 10
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold">User Management</h1>
            <div>
              <p className="flex-center p-regular-20 md:p-regular-24">
                Please choose from the following list of users:
              </p>
            </div>

            <UserCollection
              data={users?.data}
              emptyTitle="No Users Found"
              emptyStateSubtext="Come back later"
              collectionType="All_Users"
              limit={10}
              page={1}
              totalPages={2}
            />
          
          </div>
        </div>
      </section>
    </>
  )
}