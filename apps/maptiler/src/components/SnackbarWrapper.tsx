"use client";

import { closeSnackbar, snackbarStore } from "@/store/snackbar";
import { Snackbar } from "@mui/material";
import { useStore } from "@tanstack/react-store";

export function SnackbarWrapper() {
    const open = useStore(snackbarStore, (state) => state.open);
    const message = useStore(snackbarStore, (state) => state.message);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={closeSnackbar}
            message={message}
        />
    );
}