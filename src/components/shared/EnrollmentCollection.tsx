import { ISection } from "@/lib/mongo/models/section.model"
import Link from "next/link"

type EnrollmentCollectionProps = {
  data: ISection[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  collectionType?: 'All_Sections'
}

const EnrollmentCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType
}: EnrollmentCollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">

          <ul className="grid w-full grid-cols-1 gap-5 xl:gap-10">
            {data.map((section) => {
              return (
                <li key={section._id} className="flex justify-center">
                  <div className="group relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg p-5">
                    <Link
                      href={`/sections/${section._id}/view`}
                    >
                      <p className="p-semibold-18">
                        {section.class.abbreviation}: {section.class.name}
                      </p>
                      <p>
                        Section Number: {section.sectionNumber}
                      </p>
                      <p>
                        Meeting Days: {section.meetingDays}
                      </p>
                      <p>
                        Meeting Time: {section.startTime} - {section.endTime}
                      </p>
                      <p>
                        Semester: {section.semester}
                      </p>
                      <p>
                        Room Number: {section.roomNumber}
                      </p>
                      <p>
                        Instructor: {section.instructor.lastName}, {section.instructor.firstName}
                      </p>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default EnrollmentCollection