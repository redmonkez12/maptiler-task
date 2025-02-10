import { Store } from "@tanstack/store";

interface SnackbarStore {
    open: boolean;
    message: string;
}

export const snackbarStore = new Store<SnackbarStore>({
	open: false,
	message: "",
});

export const showSnackbar = (message: string) => {
	snackbarStore.setState((state) => {
		return {
			...state,
            open: true,
            message,
		};
	});
};

export const closeSnackbar = () => {
	snackbarStore.setState((state) => {
		return {
			...state,
            open: false,
            message: "",
		};
	});
}