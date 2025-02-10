"use client";

import { useConfirm } from "@/hooks/useConfirmDialog";
import { DELETE_ENTITY_MUTATION } from "@/mutations/client/entityMutations";
import { deleteEntityAction } from "@/store/entity";
import { showSnackbar } from "@/store/snackbar";
import { useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

interface Props {
	id: string;
}

export function DeleteEntityButton({ id }: Props) {
	const [ConfirmationDialog, confirm] = useConfirm("Are you sure?", "Do you really want to delete the entity?");
	const [deleteEntity] = useMutation(DELETE_ENTITY_MUTATION);
	const router = useRouter();

	async function onDelete() {
		const ok = await confirm();

		if (ok) {
			deleteEntity({
				variables: {
					id,
				},
			});

			deleteEntityAction(id);
			showSnackbar("Entity was deleted");
			router.push("/entities");
		}
	}

	return (
		<>
			<DeleteIcon
				className="cursor-pointer"
				onClick={onDelete}
			/>
			<ConfirmationDialog />
		</>
	);
}
