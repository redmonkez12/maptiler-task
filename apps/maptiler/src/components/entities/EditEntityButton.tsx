"use client";

import { toggleEditDialogAction } from "@/store/entity";
import { Button, Stack } from "@mui/material";
import NextLink from "next/link";

export function EditEntityButton() {
	return (
		<Stack spacing={{ xs: 2 }} direction="row">
              <Button
                component={NextLink}
                href="/entities"
                variant="contained"
                type="button">
                Back
            </Button>

            <Button
                onClick={toggleEditDialogAction}
                variant="contained"
                type="button">
                Edit entity
            </Button>
        </Stack>
	);
}
