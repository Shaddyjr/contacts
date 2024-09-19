import React from "react"
import { Box, LinearProgress } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import styled from "@emotion/styled"

const StyleLinearProgress = styled(LinearProgress)({
	backgroundColor: "transparent",
})

export default function SyledCompactDataGrid({ rows, columns, isLoading, initialState, width }) {
	return (
		<Box>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={initialState}
				hideFooter
				columnHeaderHeight={0}
				sx={{
					width: width,
					border: 0,
					"& .MuiDataGrid-cell:hover": {
						color: "primary.main",
					},
					"&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
					"&.MuiDataGrid-root--densityCompact .MuiDataGrid-withBorderColor": { border: 0 },
				}}
				autoHeight
				slots={{
					loadingOverlay: StyleLinearProgress,
				}}
				loading={isLoading}
				density="compact"
				getRowHeight={() => "auto"}
				getEstimatedRowHeight={() => 200}
			/>
		</Box>
	)
}
