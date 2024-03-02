import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IClass } from "@/lib/mongo/models/class.model"
import { useState } from "react"


type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [classes, setClasses] = useState<IClass[]>([])

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

export default Dropdown