import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { SyntheticEvent } from "react";

interface SnackBarProps {
  open: boolean;
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "success" | "error" | "info" | "warning" | undefined;
}

const SnackBar: React.FC<SnackBarProps> = ({
  open,
  message,
  setOpen,
  type,
}) => {
  const handleClose = (
    _: Event | SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
