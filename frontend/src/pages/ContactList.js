import React, { useState, useEffect } from "react"
import axios from "axios"
import { Box, Typography, Divider } from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import StyledCompactDataGrid from "../components/StyledCompactDataGrid"
import ActionButton from "../components/ActionButton"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
// TODO: Add default statement when no contacts
const today = dayjs()

const columns = [
	{
		field: "name",
		headerName: "Name",
		flex: 1,
		renderCell: (params) => {
			const { row } = params
			return <Link to={`/contact/${row.id}`}>{params.value}</Link>
		},
	},
	{
		field: "next_connection",
		headerName: "Next Connection",
		flex: 1,
		renderCell: (params) => {
			const { row } = params
			const nextConnectionBeforeToday = dayjs(row.next_connection) < today
			const color = nextConnectionBeforeToday ? "primary.danger" : "primary.main"
			return (
				<Typography
					variant="body1"
					display="inline"
					sx={{ display: "inline-block", whiteSpace: "pre-line", color: color }}>
					{row.next_connection}
				</Typography>
			)
		},
	},
]

export default function ContactList() {
	const [rows, setRows] = useState([])
	const [showArchived, setShowArchived] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		axios("/api/contacts/")
			.then((res) => {
				setRows(res.data)
				setIsLoading(false)
			})
			.catch((err) => console.log(err))
	}, [])
	const activeRows = rows.filter((contact) => contact.state === "active")
	const archivedRows = rows.filter((contact) => contact.state === "archived")

	const handleChangeShowArchived = () => {
		setShowArchived((prevState) => !prevState)
	}
	return (
		<Box display="flex" flexDirection="column">
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
				<Typography variant="h2" mb={3}>
					Contact List
				</Typography>
				<Box display="flex" justifyContent="center" alignItems="center" gap={2}>
					<ActionButton size="small" LinkComponent={Link} to={"/contact/new"}>
						+ New Contact
					</ActionButton>
				</Box>
				<Divider
					orientation="horizontal"
					flexItem
					light
					variant="middle"
					sx={{ borderWidth: 1, borderColor: "primary.warning", my: 2 }}
				/>

				<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
					{activeRows.length === 0 ? (
						<Typography mt={1} sx={{ color: "primary.warning" }}>
							{"{No Active Contacts}"}
						</Typography>
					) : (
						<StyledCompactDataGrid
							rows={activeRows}
							columns={columns}
							isLoading={isLoading}
							width="500px"
							initialState={{
								sorting: {
									sortModel: [{ field: "next_connection", sort: "asc" }],
								},
							}}
						/>
					)}
				</Box>
			</Box>

			<Divider
				orientation="horizontal"
				flexItem
				light
				variant="middle"
				sx={{ borderWidth: 1, borderColor: "primary.warning", my: 2 }}
			/>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
				<ToggleButtonGroup size="small" onChange={handleChangeShowArchived}>
					<ToggleButton value="Archived">
						<Typography variant="h4" mb={3} sx={{ textTransform: "none" }}>
							Archived:
							{showArchived ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
						</Typography>
					</ToggleButton>
				</ToggleButtonGroup>
				{showArchived &&
					(activeRows.length === 0 ? (
						<Typography mt={1} sx={{ color: "primary.warning" }}>
							{"{No Archived Contacts}"}
						</Typography>
					) : (
						<StyledCompactDataGrid
							rows={archivedRows}
							columns={columns}
							width="500px"
							initialState={{
								sorting: {
									sortModel: [{ field: "next_connection", sort: "asc" }],
								},
							}}
						/>
					))}
			</Box>
		</Box>
	)
}
