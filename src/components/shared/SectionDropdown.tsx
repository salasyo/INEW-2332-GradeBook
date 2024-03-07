import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllClasses } from "@/lib/actions/class.actions"
import { IClass } from "@/lib/mongo/models/class.model"
import { useEffect, useState } from "react"


type SectionDropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const SectionDropdown = ({ value, onChangeHandler }: SectionDropdownProps) => {
  const [classes, setClasses] = useState<IClass[]>([])

  useEffect(() => {
    const getClasses = async () => {
      const classesList = await getAllClasses();

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
            {item.abbreviation}: {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SectionDropdown