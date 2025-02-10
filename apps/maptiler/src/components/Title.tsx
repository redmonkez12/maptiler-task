import { Typography } from "@mui/material";

interface Props {
	label: string;
}

export function Title({ label }: Props) {
	return (
		<Typography
			variant="h3"
			gutterBottom>
			{label}
		</Typography>
	);
}
