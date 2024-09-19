import React from "react"
import { Modal, Box, Typography, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import ActionButton from "../components/ActionButton"
const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.light,
	borderStyle: "solid",
	borderColor: theme.palette.primary.warning,
	borderWidth: 2,
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.dark,
}))

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 24,
	p: 4,
	borderRadius: 5,
}

export default function ConfirmationModal({ open, onClose, onConfirmation, buttonText, bodyText }) {
	return (
		<Modal open={open} onClose={onClose}>
			<StyledBox sx={style}>
				<StyledTypography variant="h4">Confirmation</StyledTypography>
				<StyledTypography variant="body1" mt={2}>
					{bodyText}
				</StyledTypography>
				<Grid container alignContent="flex-end" justifyContent="flex-end" mt={2} gap={2}>
					<ActionButton action="confirm" isDarkTheme={true} onClick={onClose}>
						Close
					</ActionButton>
					<ActionButton action="cancel" isDarkTheme={true} onClick={onConfirmation}>
						{buttonText}
					</ActionButton>
				</Grid>
			</StyledBox>
		</Modal>
	)
}
