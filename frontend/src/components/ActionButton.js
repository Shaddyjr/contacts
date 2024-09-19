import { Button } from "@mui/material"

const ActionButton = ({ action = "confirm", isDarkTheme = false, ...props }) => {
	let actionSx
	switch (action) {
		case "cancel":
			actionSx = {
				"&:hover": {
					backgroundColor: isDarkTheme ? "primary.dark" : "primary.light",
					color: "primary.danger",
				},
				backgroundColor: "primary.danger",
				color: isDarkTheme ? "primary.dark" : "primary.light",
			}
			break
		case "confirm":
			actionSx = {
				"&:hover": {
					backgroundColor: isDarkTheme ? "primary.dark" : "primary.light",
					color: "primary.success",
				},
				backgroundColor: "primary.success",
				color: isDarkTheme ? "primary.dark" : "primary.light",
			}
			break
		default:
			alert("Bad Action")
	}

	return <Button sx={{ textTransform: "uppercase", ...actionSx }} {...props} />
}

export default ActionButton
