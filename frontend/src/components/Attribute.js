import { Box, Typography } from "@mui/material"

export default function Attribute({ label, value, sx }) {
	return (
		<Box>
			<Typography variant="body2" sx={{ textTransform: "uppercase" }}>
				{label}:
			</Typography>
			<Typography variant="body1" display="inline" sx={{ display: "inline-block", whiteSpace: "pre-line", ...sx }}>
				{value}
			</Typography>
		</Box>
	)
}
