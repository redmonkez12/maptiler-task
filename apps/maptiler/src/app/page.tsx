import { Title } from "@/components/Title";
import { Button, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

export default async function MainPage() {
	return (
		<Stack>
			<Title label="Welcome to MapTiler app" />
			<Typography variant="h4">Modules:</Typography>

			<Stack direction="row">
				<Button
					component={NextLink}
					href="/entities"
					variant="contained">
					Entities
				</Button>
			</Stack>
		</Stack>
	);
}
