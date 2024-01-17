import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectInputProps } from '@mui/material/Select/SelectInput'

type SelectPerPageProps = {
  value: number
  onChange: SelectInputProps<number>['onChange']
}

export function SelectPerPage({ value, onChange }: SelectPerPageProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>Show items per page</InputLabel>
      <Select label="Show items per page" value={value} onChange={onChange}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
  )
}
