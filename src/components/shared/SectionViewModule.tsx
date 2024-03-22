//"use client"

import { ISection } from "@/lib/mongo/models/section.model"
import { formatDateTime } from "@/lib/utils"

type SectionViewModuleProps = {
  section: ISection,
  sectionId: string,
}

const SectionViewModule = ({ section, sectionId }: SectionViewModuleProps) => {

  return (
    <section className="wrapper max-w-[500px]">

        <h4 className="py-5 p-bold-24 text-center">
          {section.class.abbreviation}: {section.class.name} - {section.sectionNumber}
        </h4>
        
        <p className="py-3 italic">
          Description: {section.class.description}
        </p>

        <p className="py-3">
          Meeting Days: {section.meetingDays}
        </p>
        <p className="py-3">
          Meeting Time: {section.startTime} - {section.endTime}
        </p>
        <p className="py-3">
          Start/End Dates: {formatDateTime(section.startDate).dateOnly} - {formatDateTime(section.endDate).dateOnly}
        </p>
        <p className="py-3">
          Room Number: {section.roomNumber}
        </p>
        <p className="py-3">
          Instructor: {section.instructor.lastName}, {section.instructor.firstName}
        </p>
      </section>
  )
}

export default SectionViewModule