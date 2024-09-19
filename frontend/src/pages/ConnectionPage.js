import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Box, Typography, Grid } from "@mui/material"
import ConfirmationModal from "../components/ConfirmationModal"
import ActionButton from "../components/ActionButton"
import { convertDateString } from "./util"
import AttributeList from "../components/AttributeList"
const defaultConnection = {
	id: -1,
	date: "",
	note: "",
	contact: -1,
}

export default function ConnectionPage() {
	const { id } = useParams()
	const [data, setData] = useState(defaultConnection)
	const [open, setModalState] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const getConnectionData = async () => {
			const { data: connectionData } = await axios(`/api/connections/${id}`)
			const { data: contactData } = await axios(`/api/contacts/${connectionData.contact}`)
			const finalData = { ...connectionData, contact: contactData } // need full contact detail (name & id)
			setData(finalData)
		}

		getConnectionData()
	}, [id])

	const handleOpenModal = () => {
		// opens confirmation modal
		setModalState(true)
	}

	const handleDelete = () => {
		axios
			.delete(`/api/connections/${id}/`)
			.then((res) => navigate(`/contact/${data.contact.id}`))
			.catch((err) => console.log(err))
	}

	const handleCloseModal = () => {
		setModalState(false)
	}

	const attributes = [
		{ label: "date", key: "date", value: convertDateString(data.date) },
		{ label: "note", key: "note", value: data.note || "{empty}" },
	]
	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
			<Typography variant="h3" mt={3}>
				Connection for <Link to={`/contact/${data.contact.id}/`}>{data.contact.name}</Link>
			</Typography>

			<AttributeList attributes={attributes} />

			<Grid container direction="row" justifyContent="space-evenly" width={0.5} mt={3}>
				{/* We pass just the contact id as state for editing */}
				<ActionButton
					action="confirm"
					LinkComponent={Link}
					to={`/connection/${id}/edit/`}
					state={{ contact: data.contact.id }}>
					edit
				</ActionButton>
				<ActionButton action="cancel" onClick={handleOpenModal}>
					delete
				</ActionButton>
			</Grid>

			{/* MODAL */}
			<ConfirmationModal
				open={open}
				onClose={handleCloseModal}
				onConfirmation={handleDelete}
				buttonText="Delete Connection"
				bodyText="Are you sure you want to delete this connection?"
			/>
		</Box>
	)
}
