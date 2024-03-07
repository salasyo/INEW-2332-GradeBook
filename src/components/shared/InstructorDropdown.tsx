import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { IInstructor } from "@/lib/mongo/models/instructor.model"
import { getAllInstructors } from "@/lib/actions/instructor.actions"


type InstructorDropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const InstructorDropdown = ({ value, onChangeHandler }: InstructorDropdownProps) => {
  const [instructors, setInstructors] = useState<IInstructor[]>([])

  useEffect(() => {
    const getClasses = async () => {
      const instructorsList = await getAllInstructors();

      instructorsList && setInstructors(instructorsList as IInstructor[])
    }

    getClasses();
  })

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Instructor" />
      </SelectTrigger>
      <SelectContent>
        {instructors.length > 0 && instructors.map((instructor) => (
          <SelectItem key={instructor._id} value={instructor._id} className="select-item p-regular-14">
            {instructor.lastName}, {instructor.firstName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default InstructorDropdown