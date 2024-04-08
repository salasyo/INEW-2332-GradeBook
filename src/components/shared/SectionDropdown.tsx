import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllClasses, getClassesBySubject } from "@/lib/actions/class.actions"
import { IClass } from "@/lib/mongo/models/class.model"
import { useEffect, useState } from "react"


type SectionDropdownProps = {
  value?: string
  onChangeHandler?: () => void
  subject: string
}

const SectionDropdown = ({ value, onChangeHandler, subject }: SectionDropdownProps) => {
  const [classes, setClasses] = useState<IClass[]>([])

  useEffect(() => {
    const getClasses = async () => {
      const limit = 10;
      const page = 1;
      //const subject = "MATH";

      const classesList = await getClassesBySubject({ subject, limit, page });

      classesList && setClasses(classesList as IClass[])
    }

    getClasses();
  })

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Class" />
      </SelectTrigger>
      <SelectContent>
        {classes.length > 0 && classes.map((item) => (
          <SelectItem key={item._id} value={item._id} className="select-item p-regular-14">
            {item.subject} {item.number}: {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SectionDropdown