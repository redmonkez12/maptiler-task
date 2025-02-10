import { Entity } from "@/queries/server/entityQueries";
import { Store } from "@tanstack/store";

interface EntityStore {
	entityList: Entity[];
	createDialogOpen: boolean;
	editDialogOpen: boolean;
	entity: Entity | null;
}

export const entityStore = new Store<EntityStore>({
	entityList: [],
	createDialogOpen: false,
	editDialogOpen: false,
	entity: null,
});

export const setEntityListAction = (entityList: EntityStore["entityList"]) => {
	entityStore.setState((state) => {
		return {
            ...state,
			entityList,
		};
	});
};

export const deleteEntityAction = (id: string) => {
	entityStore.setState((state) => {
        const entityList = state.entityList.filter(entity => entity.id !== id);

		return {
			...state,
			entityList,
		};
	});
};

export const toggleCreateDialogAction  = () => {
	entityStore.setState((state) => {
		return {
			...state,
			createDialogOpen: !state.createDialogOpen,
		};
	});
};

export const toggleEditDialogAction  = () => {
	entityStore.setState((state) => {
		return {
			...state,
			editDialogOpen: !state.editDialogOpen,
		};
	});
};

export const selectEntityAction = (entity: Entity) => {
	entityStore.setState((state) => {
		return {
			...state,
			entity,
		};
	});
}