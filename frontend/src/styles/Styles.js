import { createTheme } from "@mui/material"

const Colors = {
	rich_black: "#0d1321",
	tigers_eye: "#bf6900",
	claret: "#8b1e3f",
	sea_green: "#09814a",
	eggshell: "#f0ebd8",
	light: "#f0ebd8",
	dark: "#0d1321",
	success: "#09814a",
	warning: "#bf6900",
	danger: "#8b1e3f",
}

const theme = createTheme({
	palette: {
		primary: {
			main: Colors.light,
			light: Colors.light,
			dark: Colors.dark,
			success: Colors.success,
			warning: Colors.warning,
			danger: Colors.danger,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				text: {
					fontFamily: "'Zen Antique', serif",
					letterSpacing: 2,
				},
			},
		},
	},
	typography: {
		h1: {
			fontFamily: "'Zen Antique', serif",
			color: Colors.light,
		},
		h2: {
			fontFamily: "'Zen Antique', serif",
			color: Colors.light,
		},
		h3: {
			fontFamily: "'Zen Antique', serif",
			color: Colors.light,
		},
		h4: {
			fontFamily: "'Zen Antique', serif",
			color: Colors.light,
		},
		body1: {
			fontFamily: "'Martian Mono', monospace",
			color: Colors.light,
		},
		body2: {
			fontFamily: "'Martian Mono', monospace",
			color: Colors.warning,
		},
	},
})

export default theme
