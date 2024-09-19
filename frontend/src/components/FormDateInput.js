import React from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { FormControl } from "@mui/material"
import { humanDateStrFormat } from "../pages/util"

const dateSX = {
	color: "primary.light",
}
const slotProps = {
	textField: {
		sx: {
			"& .MuiInputBase-root input": { color: "primary.light" },
			"& .MuiInputBase-root fieldset": { borderColor: "primary.warning" },
			"&:hover .MuiInputBase-root fieldset": { borderColor: "primary.warning" },
			"&:focus .MuiInputBase-root fieldset": { borderColor: "primary.warning" },
			"&:focus-visible .MuiInputBase-root fieldset": { borderColor: "primary.warning" },
			"&:active .MuiInputBase-root fieldset": { borderColor: "primary.warning" },
			"& .Mui-error fieldset.MuiOutlinedInput-notchedOutline": { borderColor: "primary.danger" },
			"& .Mui-focused.Mui-error fieldset.MuiOutlinedInput-notchedOutline": { borderColor: "primary.danger" },
			"& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": { borderColor: "primary.warning" },
			"& label.MuiInputLabel-outlined.Mui-error": { color: "primary.danger" },
			"& .MuiInputBase-root.Mui-error .MuiIconButton-root": { color: "primary.danger" }, // technically on adornment
		},
	},
	inputAdornment: {
		sx: {
			"& .MuiIconButton-root": { color: "primary.warning" },
		},
	},
	desktopPaper: {
		sx: {
			"& .MuiDateCalendar-root .MuiPickersCalendarHeader-label": {
				color: "primary.dark",
			},
			"& .MuiDateCalendar-root .MuiButtonBase-root:hover": {
				backgroundColor: "primary.warning",
				color: "primary.dark",
			},
			"& .MuiDateCalendar-root .MuiButtonBase-root.Mui-selected": {
				backgroundColor: "primary.warning",
				color: "primary.dark",
			},
			"& .MuiDateCalendar-root .MuiPickersYear-yearButton.Mui-selected": {
				backgroundColor: "primary.warning",
				color: "primary.dark",
			},
			"& .MuiDateCalendar-root .MuiPickersYear-yearButton:hover": {
				backgroundColor: "primary.warning",
				color: "primary.dark",
			},
		},
	},
}

export default function FormDateInput({ id, label, value, onChange }) {
	return (
		<FormControl>
			<DatePicker
				id={id}
				label={label}
				sx={dateSX}
				value={value}
				format={humanDateStrFormat}
				onChange={onChange}
				slotProps={slotProps}
			/>
		</FormControl>
	)
}
