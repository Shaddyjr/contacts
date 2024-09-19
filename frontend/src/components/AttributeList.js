import { Grid } from "@mui/material"
import Attribute from "./Attribute"

export default function AttributeList({ attributes }) {
	return (
		<Grid container direction="column" mt={4} px={6} gap={2}>
			{attributes.map(({ key, label, value, sx }) => {
				return <Attribute key={key} label={label} value={value} sx={sx} />
			})}
		</Grid>
	)
}
