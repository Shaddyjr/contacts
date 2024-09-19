import React from "react"
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material"
import { styled } from "@mui/material/styles"

const selectSX = {
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
	"& .MuiSelect-icon": {
		color: "primary.warning",
	},
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	color: theme.palette.primary.light,
	backgroundColor: theme.palette.primary.dark,
	"&.Mui-selected": {
		backgroundColor: theme.palette.primary.success,
	},
	"&.Mui-selected:hover": {
		backgroundColor: theme.palette.primary.success,
	},
	"&:hover": {
		backgroundColor: theme.palette.primary.success,
	},
	"&.Mui-selected:focus": {
		backgroundColor: theme.palette.primary.success,
	},
}))

// HELPFUL!: https://www.youtube.com/watch?v=CTDZ-5MnETA
const MenuProps = {
	PaperProps: {
		sx: { backgroundColor: (theme) => `${theme.palette.primary.dark}99` },
	},
}

export default function FormDropdownInput({ id, label, value, options, onChange, name }) {
	return (
		<FormControl>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				label={label}
				labelId={id}
				sx={selectSX}
				MenuProps={MenuProps}
				variant="outlined"
				value={value}
				name={name}
				onChange={onChange}>
				{options.map(({ id: optionId, name: option }) => {
					return (
						<StyledMenuItem dense key={optionId} value={optionId}>
							{option}
						</StyledMenuItem>
					)
				})}
			</Select>
		</FormControl>
	)
}
