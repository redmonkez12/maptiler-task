import { Stack } from "@mui/material";
import { EntitiesTable } from "@/components/entities/EntitiesTable";
import { Title } from "@/components/Title";
import { getEntities } from "@/queries/server/entityQueries";
import { CreateEntityButton } from "@/components/entities/CreateEntityButton";

type SearchParams = Promise<{ offset: string; limit: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
	const { offset, limit } = await searchParams;
	const limitNum = Number(limit ?? 5);
	const entities = await getEntities(limitNum, Number(offset ?? 0));

	return (
		<Stack>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between">
				<Title label="Entities" />

				<CreateEntityButton />
			</Stack>

			<EntitiesTable
				initialData={entities}
				limit={limitNum}
			/>
		</Stack>
	);
}
