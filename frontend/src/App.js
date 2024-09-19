import { BrowserRouter, Routes, Route } from "react-router-dom"
import ContactList from "./pages/ContactList"
import ContactPage from "./pages/ContactPage"
import NewContact from "./pages/NewContact"
import ConnectionPage from "./pages/ConnectionPage"
import NewConnection from "./pages/NewConnection"
import NoPage from "./pages/NoPage"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./styles/Styles"

function App() {
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{/* Provides localized datetimes */}
				<BrowserRouter>
					<Routes>
						<Route index element={<ContactList />} />
						<Route path="/contacts" element={<ContactList />} />
						<Route path="/contact/new" element={<NewContact />} />
						<Route path="/contact/:id/edit" element={<NewContact edit={true} />} />
						<Route path="/contact/:id" element={<ContactPage />} />
						<Route path="/connection/new" element={<NewConnection />} />
						<Route path="/connection/:id/edit" element={<NewConnection edit={true} />} />
						<Route path="/connection/:id" element={<ConnectionPage />} />
						<Route path="*" element={<NoPage />} />
					</Routes>
				</BrowserRouter>
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
