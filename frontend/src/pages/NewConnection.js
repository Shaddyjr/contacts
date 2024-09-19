import React, { useState, useEffect } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import axios from "axios"
import FormTextInput from "../components/FormTextInput"
import FormDropdownInput from "../components/FormDropdownInput"
import FormDateInput from "../components/FormDateInput"
import dayjs from "dayjs"
import { Box, Typography } from "@mui/material"
import { dbDateStrFormat } from "./util"
import ActionButton from "../components/ActionButton"

const defaultConnection = {
	id: -1,
	date: dayjs(), // will store dayjs object
	note: "",
	contact: "",
}

export default function NewConnection() {
	const [errors, setErrors] = useState(undefined)
	const { id } = useParams() // if we have a connection id, then this must be an edit
	const isEdit = !!id
	const [data, setData] = useState(defaultConnection)
	const [options, setOptions] = useState([])
	const navigate = useNavigate()
	const { state } = useLocation()
	const handleCancel = () => {
		navigate(-1)
	}
	useEffect(() => {
		if (state === null) {
			// Wrong way to access this page, redirect to home
			navigate("/")
		} else {
			axios(`/api/contacts`)
				.then((res) => {
					setOptions(res.data)
					if (state.contact) {
						// Coming from a contact (most of the time)
						setData((prevData) => {
							return { ...prevData, contact: state.contact }
						})
					}
					if (isEdit) {
						// Connection already made, must pull data
						axios(`/api/connections/${id}`)
							.then((res) => {
								const formattedData = { ...res.data }
								formattedData.date = dayjs(res.data.date)
								setData(formattedData)
							})
							.catch((err) => console.log(err))
					}
				})
				.catch((err) => console.log(err))
		}
	}, [id, isEdit, state, navigate])
	const handleSubmit = (e) => {
		// TODO, go back to contact instead
		e.preventDefault()
		const formattedData = { ...data }
		formattedData.date = data.date.format(dbDateStrFormat)
		if (isEdit) {
			// edit, therefore update and navigate to connection
			axios
				.put(`/api/connections/${id}/`, formattedData)
				.then((res) => navigate(`/contact/${data.contact}`))
				.catch((err) => setErrors(err.response.data))
		} else {
			// new, therefore create and navigate to new connection
			axios
				.post(`/api/connections/`, formattedData)
				.then((res) => navigate(`/contact/${res.data.contact}`))
				.catch((err) => setErrors(err.response.data))
		}
	}
	const handleOnChange = (e) => {
		const { value, name } = e.target
		setData((prevData) => {
			const prevDataCopy = { ...prevData }
			prevDataCopy[name] = value
			return prevDataCopy
		})
	}
	const handleOnDropdownChange = (e) => {
		setData((prevData) => {
			return { ...prevData, contact: e.target.value }
		})
	}
	const handleDateOnChange = (newDate) => {
		setData((prevData) => {
			return { ...prevData, date: newDate }
		})
	}
	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
			<Typography variant="h3" mt={3}>
				{isEdit ? "Editting Connection" : "Create Connection"}
			</Typography>
			{errors !== undefined &&
				Object.keys(errors).map((key) => (
					<Typography variant="body2" mt={2} sx={(theme) => ({ color: theme.palette.primary.danger })} key={key}>
						{key}: {errors[key]}
					</Typography>
				))}
			<Box display="flex" component="form" flexDirection="column" width={600} mt={4} gap={2} onSubmit={handleSubmit}>
				<FormDropdownInput
					id="contact"
					name="contact"
					label="Contact:"
					options={options}
					value={data.contact}
					onChange={handleOnDropdownChange}
				/>
				<FormDateInput id="date" label="Connection Date:" value={data.date} onChange={handleDateOnChange} />
				<FormTextInput id="note" label="Note:" value={data.note} onChange={handleOnChange} />
				<ActionButton action="confirm" isDarkTheme={false} onClick={handleSubmit}>
					Submit
				</ActionButton>
				<ActionButton action="cancel" isDarkTheme={false} onClick={handleCancel}>
					Cancel
				</ActionButton>
			</Box>
		</Box>
	)
}

// TODO: ADD cancel button, going back in location without committing anything
