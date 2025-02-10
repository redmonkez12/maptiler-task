import { ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function useConfirm(
  title: string,
  message: string
): [() => ReactNode, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(true);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(false);
    handleClose();
  }

  function onClose(open: boolean) {
    if (!open) {
      handleClose();
    }
  }

  const ConfirmationDialog = () => (
    <Dialog
        open={promise !== null}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
           {message}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" autoFocus>
            Confirm
        </Button>
        </DialogActions>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
}
