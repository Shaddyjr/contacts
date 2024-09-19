import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Box, Divider, Typography } from "@mui/material"
import ActionButton from "../components/ActionButton"
import StyledCompactDataGrid from "../components/StyledCompactDataGrid"
import ConfirmationModal from "../components/ConfirmationModal"
import AttributeList from "../components/AttributeList"
import { CONTACT_CADENCES, CONTACT_METHODS, dbDateStrFormat, convertDateString } from "./util"
import dayjs from "dayjs"
const dur = require("dayjs/plugin/duration")
dayjs.extend(dur) // Duration adds .duration & .isDuration APIs to support duration.
const today = dayjs()

const defaultData = {
	id: -1,
	name: "",
	next_connection: "",
	note: "",
	cadence: "",
	contact_method: "",
	state: "",
	all_connections: [
		// {
		//     "id": -1,
		//     "date": "",
		//     "note": ""
		//     "contact_id": 1
		// }
	],
}

const ACTIVE = "active"
const ARCHIVED = "archived"
const DAYJS_CADENCE_CONVERSIONS = {
	monthly: { M: 1 },
	quarterly: { M: 3 },
	semiannually: { M: 6 },
	annually: { y: 1 },
}

const columns = [
	{
		field: "date",
		headerName: "Date",
		width: 120,
		renderCell: (params) => {
			const { row } = params
			return <Link to={`/connection/${row.id}/`}>{convertDateString(row.date)}</Link>
		},
	},
	{
		field: "note",
		headerName: "Note",
		flex: 1,
		renderCell: (params) => {
			const { row } = params
			return (
				<Typography variant="body1" display="inline" sx={{ display: "inline-block", whiteSpace: "pre-line" }}>
					{row.note || "{empty}"}
				</Typography>
			)
		},
	},
]

export default function ContactPage() {
	const { id } = useParams()
	const [data, setData] = useState(defaultData)
	const [open, setModalState] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	useEffect(() => {
		axios(`/api/contacts/${id}`)
			.then((res) => {
				setData(res.data)
				setIsLoading(false)
			})
			.catch((err) => navigate("/404"))
	}, [id, navigate])

	const handleOpenModal = () => {
		// opens confirmation modal
		setModalState(true)
	}
	const isActive = data.state === ACTIVE
	const changeStateText = isActive ? "Archive" : "Activate"

	const handleStateChange = () => {
		const newState = isActive ? ARCHIVED : ACTIVE
		axios
			.patch(`/api/contacts/${id}/`, { state: newState })
			.then((res) => setData(res.data))
			.catch((err) => console.log(err))
		setModalState(false)
	}

	const handleCloseModal = () => {
		setModalState(false)
	}
	const handleCadenceAddition = () => {
		console.log("handleCadenceAddition")
		const duration = DAYJS_CADENCE_CONVERSIONS[data.cadence]
		const nextConnection = today.add(dayjs.duration(duration))
		const formattedNextConnection = nextConnection.format(dbDateStrFormat)
		axios
			.patch(`/api/contacts/${id}/`, { next_connection: formattedNextConnection })
			.then((res) => setData(res.data))
			.catch((err) => console.log(err))
	}
	const nextConnectionBeforeToday = dayjs(data.next_connection) < today
	const attributes = [
		{
			label: "next connection",
			key: "next_connection",
			value: convertDateString(data.next_connection),
			sx: nextConnectionBeforeToday ? { color: "primary.danger" } : {},
		},
		{ label: "cadence", key: "cadence", value: CONTACT_CADENCES[data.cadence] },
		{ label: "contact method", key: "contact_method", value: CONTACT_METHODS[data.contact_method] },
		{ label: "note", key: "note", value: data.note || "{empty}" },
	]
	return (
		<Box display="flex" flexDirection="column">
			{/* BACK TO CONTACTS LINK */}
			<Box py={2} px={2}>
				<Link to="/contacts/">&lt;&lt;BACK TO CONTACTS</Link>
			</Box>

			{/* LIST OF MAIN ATTRIBUTES */}
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
				<Typography variant="h3" mb={3}>
					{data.name}
				</Typography>
				{/* ACTION BUTTONS */}
				<Box display="flex" justifyContent="center" alignItems="center" gap={2}>
					<ActionButton size="small" LinkComponent={Link} to={`/contact/${id}/edit/`}>
						Edit Contact
					</ActionButton>
					{/* quick action buttons */}
					<ActionButton size="small" onClick={handleCadenceAddition}>
						Advance Next Connection
					</ActionButton>
					<ActionButton
						size="small"
						onClick={handleOpenModal}
						action={isActive ? "cancel" : "confirm"}>{`${changeStateText} Contact`}</ActionButton>
				</Box>

				<AttributeList attributes={attributes} />
			</Box>

			<Divider
				orientation="horizontal"
				flexItem
				light
				variant="middle"
				sx={{ borderWidth: 1, borderColor: "primary.warning" }}
			/>
			{/* LIST OF CONNECTIONS */}
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
				<Typography variant="h4" mt={1} mb={1}>
					Connection History
				</Typography>
				<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
					{data.all_connections.length === 0 ? (
						<Typography mt={1} sx={{ color: "primary.warning" }}>
							{"{No Connections}"}
						</Typography>
					) : (
						<StyledCompactDataGrid
							rows={data.all_connections}
							columns={columns}
							isLoading={isLoading}
							width="800px"
							initialState={{
								sorting: {
									sortModel: [{ field: "date", sort: "asc" }],
								},
							}}
						/>
					)}
				</Box>
				{/* quick action buttons */}
				<Box mt={2}>
					<ActionButton size="small" LinkComponent={Link} to="/connection/new/" state={{ contact: id }}>
						+ New Connection
					</ActionButton>
				</Box>
			</Box>
			<ConfirmationModal
				open={open}
				onClose={handleCloseModal}
				onConfirmation={handleStateChange}
				buttonText={`${changeStateText} Contact!`}
				bodyText={`Are you sure you want to ${changeStateText.toLowerCase()} ${data.name}?`}
			/>
		</Box>
	)
}
