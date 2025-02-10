import { findAllEntities, findEntityById } from "@/services/entities";

export const entityQueries = {
    async allEntities(_: any, { limit, offset }: { limit: number; offset: number }) {
        const safeLimit = Math.min(Math.max(limit, 1), 100);
        const safeOffset = Math.max(offset, 0);
    
        return findAllEntities({
            limit: safeLimit,
            offset: safeOffset,
        });
    },
    async entityById(_: any, param: { id: string }) {
        return findEntityById(param.id);
    }
}
