"use client";

import { toggleCreateDialogAction } from "@/store/entity";
import { Button } from "@mui/material";

export function CreateEntityButton() {
	return (
		<Button
            onClick={toggleCreateDialogAction}
			variant="contained"
			type="button">
			Create entity
		</Button>
	);
}
