
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type RoleDropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const RoleDropdown = ({ value, onChangeHandler }: RoleDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value} >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Role " />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none" className="select-item p-regular-14">None</SelectItem>
        <SelectItem value="student" className="select-item p-regular-14">Student</SelectItem>
        <SelectItem value="instructor" className="select-item p-regular-14">Instructor</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default RoleDropdown