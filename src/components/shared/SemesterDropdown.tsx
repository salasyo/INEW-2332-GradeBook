import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SemesterDropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const SemesterDropdown = ({ value, onChangeHandler }: SemesterDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Semester" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="FA-2023 (Aug 21 - Dec 7)" className="select-item p-regular-14">FA-2023 (Aug 21 - Dec 7)</SelectItem>
        <SelectItem value="SP-2024 (Jan 16 - May 9)" className="select-item p-regular-14">SP-2024 (Jan 16 - May 9)</SelectItem>
        <SelectItem value="FA-2024 (Aug 26 - Dec 12)" className="select-item p-regular-14">FA-2024 (Aug 26 - Dec 12)</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SemesterDropdown