import { Stack } from "@mui/material";
import { EntitiesTable } from "@/components/entities/EntitiesTable";
import { Title } from "@/components/Title";
import { getEntities } from "@/queries/server/entityQueries";
import { CreateEntityButton } from "@/components/entities/CreateEntityButton";

interface PageProps {
	searchParams:  Promise<{ offset: string, limit: string }>;
}

export default async function Home(params: Promise<PageProps>) {
	const awaitedParams = await params;
	const { offset, limit } = await awaitedParams.searchParams;
	const limitNum = Number(limit ?? 5);
	const entities = await getEntities(limitNum, Number(offset ?? 0));

	return (
		<Stack>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between">
				<Title label="Entities" />

				<CreateEntityButton/>	
			</Stack>

			<EntitiesTable
				initialData={entities}
				limit={limitNum}
			/>
		</Stack>
	);
}
