import { EntityDetail } from "@/components/EntityDetail";
import { getEntity } from "@/queries/server/entityQueries";
import { Stack } from "@mui/material";
import { redirect } from "next/navigation";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function EntityPage(props: Promise<PageProps>) {
	const { params } = await props;
	const awaitedParams = await params;
	const entity = await (async () => {
		try {
			return await getEntity(awaitedParams.id);
		} catch (e) {
			console.log(e);
		}
	})();

	if (!entity) {
		redirect("/entities");
	}

	return (
		<Stack spacing={{ xs: 2 }}>
			<EntityDetail entity={entity} />
		</Stack>
	);
}
