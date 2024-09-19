import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import FormTextInput from "../components/FormTextInput"
import FormDropdownInput from "../components/FormDropdownInput"
import FormDateInput from "../components/FormDateInput"
import dayjs from "dayjs"
import { Box, Typography } from "@mui/material"
import { CONTACT_CADENCES, CONTACT_STATES, CONTACT_METHODS, convertToOptions, dbDateStrFormat } from "./util"
import ActionButton from "../components/ActionButton"

const cadenceOptions = convertToOptions(CONTACT_CADENCES)
const stateOptions = convertToOptions(CONTACT_STATES)
const methodOptions = convertToOptions(CONTACT_METHODS)

const defaultData = {
	name: "",
	next_connection: dayjs(), // will store dayjs object
	note: "",
	cadence: "annually",
	state: "active",
	contact_method: "email",
}
export default function NewContact() {
	const [errors, setErrors] = useState(undefined)
	const { id } = useParams() // if we have a contact id, then this must be an edit
	const isEdit = !!id
	const navigate = useNavigate()
	const [data, setData] = useState(defaultData)
	const handleCancel = () => {
		navigate(-1)
	}
	useEffect(() => {
		if (isEdit) {
			axios(`/api/contacts/${id}`)
				.then((res) => {
					const formattedData = { ...res.data }
					formattedData.next_connection = dayjs(res.data.next_connection)
					setData(formattedData)
				})
				.catch((err) => console.log(err))
		}
	}, [id, isEdit])

	const handleSubmit = (e) => {
		e.preventDefault()
		const formattedData = { ...data }
		formattedData.next_connection = data.next_connection.format(dbDateStrFormat)
		console.log({ formattedData })
		if (isEdit) {
			// edit, therefore update and navigate to contact
			axios
				.put(`/api/contacts/${id}/`, formattedData)
				.then((res) => navigate(`/contact/${id}`))
				.catch((err) => setErrors(err.response.data))
		} else {
			// new, therefore create and navigate to new contact
			axios
				.post(`/api/contacts/`, formattedData)
				.then((res) => navigate(`/contact/${res.data.id}`))
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

	const handleDateOnChange = (newDate) => {
		setData((prevData) => {
			return { ...prevData, next_connection: newDate }
		})
	}

	const handleOnDropDownChange = ({ target: { value, name } }) => {
		setData((prevData) => ({ ...prevData, [name]: value }))
	}

	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
			<Typography variant="h3" mt={3}>
				{isEdit ? "Editting Contact" : "Create Contact"}
			</Typography>
			{errors !== undefined &&
				Object.keys(errors).map((key) => (
					<Typography variant="body2" mt={2} sx={(theme) => ({ color: theme.palette.primary.danger })} key={key}>
						{key}: {errors[key]}
					</Typography>
				))}
			<Box display="flex" component="form" flexDirection="column" width={600} mt={4} gap={2} onSubmit={handleSubmit}>
				<FormTextInput id="name" label="Name:" value={data.name} onChange={handleOnChange} />
				<FormDropdownInput
					id="cadence"
					name="cadence"
					label="Cadence:"
					value={data.cadence}
					options={cadenceOptions}
					onChange={handleOnDropDownChange}
				/>
				<FormDateInput
					id="next_connection"
					label="Next Connection:"
					value={data.next_connection}
					onChange={handleDateOnChange}
				/>
				<FormDropdownInput
					id="state"
					name="state"
					label="State:"
					value={data.state}
					options={stateOptions}
					onChange={handleOnDropDownChange}
				/>
				<FormDropdownInput
					id="contact_method"
					name="contact_method"
					label="Contact Method:"
					value={data.contact_method}
					options={methodOptions}
					onChange={handleOnDropDownChange}
				/>
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
