"use client";

import { Entity } from "@/queries/server/entityQueries";
import { DeleteEntityButton } from "./entities/DeleteEntityButton";
import { EditEntityButton } from "./entities/EditEntityButton";
import { entityStore, selectEntityAction } from "@/store/entity";
import { useEffect } from "react";
import { Title } from "./Title";
import { useStore } from "@tanstack/react-store";
import { Stack } from "@mui/material";

interface Props {
	entity: Entity;
}

export function EntityDetail({ entity: initialData }: Props) {
	const entity = useStore(entityStore, (state) => state.entity);

	useEffect(() => {
		selectEntityAction(initialData);
	}, []);

	if (!entity) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Title label={`Entity Detail - ${entity?.name}`} />

			<div>Status: {entity.status.name}</div>

			<Stack spacing={{ xs: 2 }}>
				<DeleteEntityButton id={entity.id} />
				<EditEntityButton />
			</Stack>
		</>
	);
}
