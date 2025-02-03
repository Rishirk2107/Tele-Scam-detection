import { Snackbar, Alert } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai"; // Importing an icon for the alert

const SnackbarNotification = ({ open, onClose }) => (
  <Snackbar 
    open={open} 
    autoHideDuration={3000} 
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position it at the bottom-center
    TransitionProps={{ timeout: 500 }} // Smooth transition time
  >
    <Alert
      onClose={onClose}
      severity="info"
      sx={{
        width: '100%',
        background: 'linear-gradient(45deg, #42a5f5, #1e88e5)', // Soft gradient background
        color: 'white', // White text for better contrast
        fontWeight: '600', // Bold text for prominence
        fontFamily: '"Roboto", sans-serif', // Modern font style
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Soft shadow for depth
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '12px', // Add padding to space the content
        paddingRight: '12px',
      }}
      icon={<AiOutlineInfoCircle size={24} color="white" />} // Add an icon to the alert
    >
      Welcome to the Scam Analysis Dashboard!
    </Alert>
  </Snackbar>
);

export default SnackbarNotification;
