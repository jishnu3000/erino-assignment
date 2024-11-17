import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const Notification = ({ open, message, severity, onClose }) => {
  useEffect(() => {
    if (severity === "success" && open) {
      setTimeout(() => onClose(), 3000);
    }
  }, [severity, open, onClose]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
