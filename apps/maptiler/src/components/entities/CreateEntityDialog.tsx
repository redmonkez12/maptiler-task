"use client";

import { CreateEntitySchema } from "@maptiler/common";
import { CREATE_ENTITY_MUTATION } from "@/mutations/client/entityMutations";
import { entityStore, toggleCreateDialogAction } from "@/store/entity";
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
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export function CreateEntityDialog() {
	const statuses = useStore(statusStore, (state) => state.statusList);
	const createDialogOpen = useStore(entityStore, (state) => state.createDialogOpen);
	const [createEntity, { loading }] = useMutation(CREATE_ENTITY_MUTATION);
	const router = useRouter();

	const formMethods = useForm<CreateEntitySchema.Type>({
		resolver: zodResolver(CreateEntitySchema),
		defaultValues: {
			name: "",
			status: "",
		},
	});

	const { control, formState } = formMethods;

	function onSubmit(values: z.infer<typeof CreateEntitySchema>) {
		createEntity({
			variables: {
				name: values.name,
				status: values.status,
			},
		});

		toggleCreateDialogAction();

		router.refresh();

		showSnackbar("Entity was created");
	}

	return (
		<Dialog
			fullWidth
			open={createDialogOpen}
			onClose={toggleCreateDialogAction}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">New Entity</DialogTitle>
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
						onClick={toggleCreateDialogAction}
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
						Create
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
