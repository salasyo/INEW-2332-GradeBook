
import UpdateUserForm from "@/components/shared/UpdateUserForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type UpdateUserProps = {
  params: {
    id: string
  }
}

const UpdateUser = async ({ params: { id } }: UpdateUserProps) => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  const user = await getUserById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update User</h3>
      </section>

      <div className="wrapper my-8">
        <UpdateUserForm user={user} userId={user._id} />
      </div>
    </>
  )
}

export default UpdateUser