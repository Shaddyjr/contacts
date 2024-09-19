import { Box, Typography } from "@mui/material"
import cat from "../mad_cat.jpg"

const NoPage = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
			<img src={cat} alt="Mad cat" width="400px" style={{ borderRadius: "5px", border: "solid 3px var(--claret)" }} />
			<Typography variant="h3" mt={5}>
				404 PAGE NOT FOUND
			</Typography>
		</Box>
	)
}
// TODO: include home button
export default NoPage
