import { db } from "@/utils/db";
import DataLoader from "dataloader";
import { Status } from "@prisma/client";
import { notFound } from "@/errors";

export async function getAllStatuses(): Promise<Status[]> {
    try {
        return db.status.findMany();
    } catch (e) {
        console.log(e);
    }

    return [];
}

export async function getStatus(id: string): Promise<Status> {
    const status = await db.status.findFirst({
        where: {
            id,
        },
    });

    if (!status) {
        throw notFound(`Status not found [${id}]`);
    }

    return status;
}

export type StatusLoader = DataLoader<string, Status>;

export function createStatusLoader(): StatusLoader {
    return new DataLoader<string, Status>(async (ids: readonly string[]) => {
        const statuses = await db.status.findMany({
            where: {
                id: {
                    in: ids as string[],
                },
            },
        });

        const statusMap = new Map(statuses.map(status => [status.id, status]));

        return ids.map(id => statusMap.get(id) || new Error(`Status not found for ID: ${id}`));
    });
};