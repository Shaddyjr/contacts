import React from "react"
import FormControl from "@mui/material/FormControl"
import { OutlinedInput, InputLabel } from "@mui/material"

const OutlinedInputSX = {
	color: "primary.light",
	"& .MuiOutlinedInput-notchedOutline": {
		borderColor: "primary.warning",
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "primary.warning",
	},
	"&:focus .MuiOutlinedInput-notchedOutline": {
		borderColor: "primary.warning",
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "primary.warning",
	},
	"& .MuiOutlinedInput-notchedOutline fieldset": {
		color: "primary.light",
	},
}

export default function FormTextInput({ id, label, value, onChange }) {
	return (
		<FormControl>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<OutlinedInput
				type="text"
				sx={OutlinedInputSX}
				label={label}
				onChange={onChange}
				name={id}
				value={value}
				multiline
			/>
		</FormControl>
	)
}
