import CreateUserForm from "@/components/shared/CreateUserForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreateUser = async () => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create User</h3>
      </section>

      <div className="wrapper my-8">
        <CreateUserForm />
      </div>
    </>
  )
}

export default CreateUser