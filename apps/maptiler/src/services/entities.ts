import { db } from "@/utils/db";
import { createId } from "@paralleldrive/cuid2";
import { getStatus } from "./status";
import { badRequest, internalServerError, notFound } from "@/errors";
import { z } from "zod";
import { CreateEntitySchema } from "@maptiler/common";

export interface CreateEntity {
	name: string;
	status: string;
}

export interface Pagination {
	limit: number;
	offset: number;
}

export async function findAllEntities({ limit, offset }: Pagination) {
	try {
		const entities = await db.entity.findMany({
            take: limit,
            skip: offset,
            orderBy: { id: "asc" },
        });
    
        const count = await db.entity.count();
    
        return {
            entities,
            count,
        };
	} catch {
		throw internalServerError();
	}
}

export async function findEntityById(id: string) {
	try {
		const entity = await db.entity.findFirst({
			where: {
				id,
			},
		});

        if (!entity) {
            throw notFound(`Entity not found [${id}]`);
        }

        return entity;
	} catch (e: any) {
        console.error("Error fetching entity:", e);

        if (e.message.includes("Entity not found")) {
			throw notFound(e.message);
		} else {
			throw internalServerError();
		}
	}
}

export async function editEntity(id: string, name: string, status: string) {
    try {
        const updatedEntity = await db.entity.update({
            where: { id },
            data: { name, statusId: status },
        });

        return updatedEntity;
    } catch (e: any) {
        if (e.code === "P2025") {
            throw notFound(`Entity with ID ${id} not found`);
        }
        console.error("Error updating entity:", e.message);
        throw internalServerError();
    }
}

export async function createEntity(input: CreateEntity) {
	try {
		const data = CreateEntitySchema.parse(input);
		const status = await getStatus(data.status);

		return await db.entity.create({
			data: {
				id: createId(),
				name: data.name,
				statusId: status.id,
			},
		});
	} catch (e: any) {
		console.error("Error creating entity:", e);

		if (e instanceof z.ZodError) {
			throw badRequest(`Validation failed: ${e.errors.map((e) => e.message).join(", ")}`);
		} else if (e.message.includes("Status not found")) {
			throw notFound(e.message);
		} else if (e.code === "P2002") {
			throw badRequest("An entity already exists.");
		} else {
			throw internalServerError();
		}
	}
}

export async function deleteEntity(id: string) {
	const entity = await db.entity.delete({
		where: {
			id,
		},
	});

	if (!entity) {
		throw notFound(`Entity not found [${id}]`);
	}

	return entity;
}
