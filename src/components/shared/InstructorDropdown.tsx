import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { IInstructor } from "@/lib/mongo/models/instructor.model"
import { getAllInstructors } from "@/lib/actions/instructor.actions"
import { getAllInstructorUsers } from "@/lib/actions/user.actions"
import { IUser } from "@/lib/mongo/models/user.model"


type InstructorDropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const InstructorDropdown = ({ value, onChangeHandler }: InstructorDropdownProps) => {
  const [instructors, setInstructors] = useState<IUser[]>([])

  useEffect(() => {
    const getClasses = async () => {
      //const instructorsList = await getAllInstructors();
      const limit = 10;
      const page = 1;

      const instructorsList = await getAllInstructorUsers({ limit, page });

      instructorsList && setInstructors(instructorsList as IUser[])
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