import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import { DialogWrapper } from "@/components/DialogWrapper";
import { EntityInitializer } from "@/components/EntityInitializer";
import { getStatuses } from "@/queries/server/statusQueries";

export default async function EntitiesLayout({ children }: PropsWithChildren) {
	const statusList = await getStatuses();

	return (
		<Stack spacing="4">
			<EntityInitializer statusList={statusList}>{children}</EntityInitializer>
			<DialogWrapper />
		</Stack>
	);
}
