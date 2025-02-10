import { Stack } from "@mui/material";
import { Logo } from "./Logo";

export default function Footer() {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
			<Stack direction="row" sx={{ padding: "1rem 1rem", maxWidth: "1280px", width: "100%", borderBottom: "1px solid #eee" }} mx={{ padding: "1rem 2rem" }}>
				<Logo />
			</Stack>
		</Stack>
    );
}