import { EntityDetail } from "@/components/EntityDetail";
import { getEntity } from "@/queries/server/entityQueries";
import { Stack } from "@mui/material";
import { redirect } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function EntityPage({ params }: { params: Params }) {
    const { id } = await params;
	const entity = await (async () => {
		try {
			return await getEntity(id);
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
