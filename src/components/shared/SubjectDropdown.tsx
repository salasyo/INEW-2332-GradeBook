import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllSubjects } from "@/lib/actions/subject.actions"
import { ISubject } from "@/lib/mongo/models/subject.model"
import { useEffect, useState } from "react"


type SubjectDropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const SubjectDropdown = ({ onChangeHandler, value }: SubjectDropdownProps) => {
  const [subjects, setSubjects] = useState<ISubject[]>([])

  useEffect(() => {
    const getSubjects = async () => {
      const subjectsList = await getAllSubjects();

      subjectsList && setSubjects(subjectsList as ISubject[])
    }

    getSubjects();
  })

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        {subjects.length > 0 && subjects.map((item) => (
          <SelectItem key={item._id} value={item.subjectAbbr} className="select-item p-regular-14">
            {item.subjectAbbr}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectDropdown