import dayjs from "dayjs"

// DUPLICATED CONSTANTS FROM models.py
export const CONTACT_CADENCES = {
	monthly: "Monthly",
	quarterly: "Quarterly",
	semiannually: "Semiannually",
	annually: "Annually",
}
export const CONTACT_STATES = {
	active: "Active",
	archived: "Archived",
}
export const CONTACT_METHODS = {
	email: "Email",
	facebook: "Facebook",
	signal: "Signal",
	text: "Text",
	phonecall: "Phonecall",
	discord: "Discord",
	linkedin: "LinkedIn",
	whatsapp: "WhatsApp",
}

export const convertToOptions = (OPTION_CONSTANT) => {
	return Object.entries(OPTION_CONSTANT).map(([key, value]) => ({
		id: key,
		name: value,
	}))
}

//https://day.js.org/docs/en/parse/string-format
export const humanDateStrFormat = "MM/DD/YYYY"
export const dbDateStrFormat = "YYYY-MM-DD"
export const convertDateString = (dateStr) => {
	// "2023-01-01" => "01/01/2023"
	return dayjs(dateStr).format(humanDateStrFormat)
}
