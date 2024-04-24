import Collection from "@/components/shared/Collection"
import { getAllSections } from "@/lib/actions/section.actions"

export default async function ViewSections() {
  const sections = await getAllSections({
    query: '',
    classType: '',
    page: 1,
    limit: 100
  });

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">View Sections</h3>
      </section>

      <div>
        <Collection 
          data={sections?.data}
          emptyTitle="No Sections Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={100}
          page={1}
          totalPages={2}
        />
      </div>
    </>
  )
}