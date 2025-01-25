import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ open, onClose }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
    <Alert onClose={onClose} severity="info" sx={{ width: "100%" }}>
      Welcome to the Scam Analysis Dashboard!
    </Alert>
  </Snackbar>
);

export default SnackbarNotification;
