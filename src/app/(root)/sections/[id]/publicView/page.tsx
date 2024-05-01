
import SectionViewModule from "@/components/shared/SectionViewModule";
import { getSectionById } from "@/lib/actions/section.actions";


type ViewSectionProps = {
  params: {
    id: string
  }
}

const ViewSection = async ({ params: { id } }: ViewSectionProps) => {
  const section = await getSectionById(id);

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">View Section</h3>
      </section>

      <div className="wrapper my-8">
        <SectionViewModule 
          section={section} 
          sectionId={section._id} 
        />
      </div>

      
    </>
  )
}

export default ViewSection