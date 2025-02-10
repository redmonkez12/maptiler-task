"use client";

import { useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Link,
	Pagination,
	Stack,
} from "@mui/material";
import NextLink from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { useStore } from "@tanstack/react-store";
import { entityStore, setEntityListAction } from "@/store/entity";
import { EntitiesResponse } from "@/queries/server/entityQueries";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
	initialData: EntitiesResponse["allEntities"];
	limit: number;
}

export function EntitiesTable({ initialData, limit }: Props) {
	const searchParams = useSearchParams();
	const entityList = useStore(entityStore, (state) => state.entityList);
	const router = useRouter();

	useEffect(() => {
		setEntityListAction(initialData.entities);
	}, [initialData]);

  const handlePageChange = (_: any, newPage: number) => {
    const newOffset = (newPage - 1) * limit;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    newParams.set("offset", newOffset.toString());
    newParams.set("limit", limit.toString());

    router.push(`?${newParams.toString()}`);
};


	return (
		<>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					aria-label="entities table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Status</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{entityList.map((row) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell
									component="th"
									scope="row">
									{row.name}
								</TableCell>
								<TableCell>{row.status.name}</TableCell>
								<TableCell
									align="right"
									sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
									<Link
										component={NextLink}
										href={`/entities/${row.id}`}
										sx={{ color: "customBlack.main" }}>
										<EditIcon className="cursor-pointer" />
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Stack
				style={{ marginTop: "2rem" }}
				justifyContent="center"
				direction="row">
				<Pagination
					count={Math.ceil(initialData.count / 5)}
					onChange={handlePageChange}
					showFirstButton
					showLastButton
				/>
			</Stack>
		</>
	);
}
