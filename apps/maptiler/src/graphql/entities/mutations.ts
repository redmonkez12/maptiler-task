import { CreateEntity, createEntity, deleteEntity, editEntity } from "@/services/entities";

export const entityMutations = {
    async createEntity(_: any, param: CreateEntity) {
        return await createEntity({
            name: param.name,
            status: param.status,
        });
    },
    async deleteEntity(_: any, param: { id: string }) {
        return deleteEntity(param.id);
    },
    async editEntity(_: any, param: { id: string; name: string; status: string }) {
        return editEntity(param.id, param.name, param.status);
    },
};
