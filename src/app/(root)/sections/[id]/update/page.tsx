import SectionForm from "@/components/shared/SectionForm"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const UpdateSection = () => {
  const { sessionClaims } = auth();
 
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Section</h3>
      </section>

      <div>
        <SectionForm type="Update" />
      </div>
    </>
  )
}

export default UpdateSection