"use client";

import { CreateEntitySchema } from "@maptiler/common";
import { EDIT_ENTITY_MUTATION } from "@/mutations/client/entityMutations";
import { entityStore, selectEntityAction, toggleEditDialogAction } from "@/store/entity";
import { showSnackbar } from "@/store/snackbar";
import { statusStore } from "@/store/status";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export function EditEntityDialog() {
	const entity = useStore(entityStore, (state) => state.entity);
    const statuses = useStore(statusStore, (state) => state.statusList);
	const editDialogOpen = useStore(entityStore, (state) => state.editDialogOpen);
	const [editEntity, { loading }] = useMutation(EDIT_ENTITY_MUTATION);

	const formMethods = useForm<CreateEntitySchema.Type>({
		resolver: zodResolver(CreateEntitySchema),
		defaultValues: {
			name: entity?.name ?? "",
			status: entity?.status?.id ?? "",
		},
	});

	const { control, formState, setValue } = formMethods;

    useEffect(() => {
        setValue("name", entity?.name ?? "");
        setValue("status", entity?.status?.id ?? "");
    }, [entity]);

	async function onSubmit(values: z.infer<typeof CreateEntitySchema>) {
        const { data } = await editEntity({
            variables: {
                id: entity?.id ?? "",
                name: values.name,
                status: values.status,
            },
        });

        selectEntityAction(data.editEntity);

		toggleEditDialogAction();

		showSnackbar("Entity was edited");
	}

	return (
		<Dialog
			fullWidth
			open={editDialogOpen}
			onClose={toggleEditDialogAction}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Edit Entity</DialogTitle>
			<DialogContent>
				<FormProvider {...formMethods}>
					<Stack spacing={{ xs: 4 }} marginTop="1rem">
						<Controller
							control={control}
							name="name"
							render={({ field }) => (
								<TextField
									id="outlined-basic"
									label="Name"
									variant="outlined"
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name="status"
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel id="status">Status</InputLabel>
									<Select
										labelId="entity-status-label"
										id="entity-status"
										label="Status"
										value={field.value}
										onChange={field.onChange}>
										{statuses.map(({ id, name }) => (
											<MenuItem
												key={id}
												value={id}>
												{name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
					</Stack>
				</FormProvider>
			</DialogContent>
			<DialogActions>
				<Stack
					spacing={{ xs: 2 }}
					paddingX="1rem"
					direction={{ xs: "row" }}>
					<Button
						disabled={loading}
						onClick={toggleEditDialogAction}
						sx={{
							width: { xs: "100%" },
						}}
						variant="contained"
						type="button">
						Cancel
					</Button>

					<Button
						disabled={loading || !formState.isValid}
						sx={{
							width: { xs: "100%" },
						}}
						onClick={formMethods.handleSubmit(onSubmit)}
						variant="contained"
						type="button">
						Edit
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
