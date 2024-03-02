import SectionForm from "@/components/shared/SectionForm"

const CreateSection = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Section</h3>
      </section>

      <div>
        <SectionForm type="Create" />
      </div>
    </>
  )
}

export default CreateSection