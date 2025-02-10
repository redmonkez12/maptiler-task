import { z } from "zod";

export const CreateEntitySchema = z.object({
    name: z.string().min(1),
    status: z.string(),
});

export type CreateEntitySchema = typeof CreateEntitySchema;

export namespace CreateEntitySchema {
	export type Type = z.infer<CreateEntitySchema>;
}
