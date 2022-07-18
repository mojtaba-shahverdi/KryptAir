import { Snackbar } from '@mui/material';
import React from 'react'
import { CryptoState } from '../CryptoContext'
import MuiAlert from '@mui/material/Alert';

const Alert = () => {
    const { alert, setAlert } = CryptoState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ open: false })
    };
    const [position] = React.useState({
        vertical: 'top',
        horizontal: 'left',
    });
    const { vertical, horizontal } = position;
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <MuiAlert
                onClose={handleClose}
                elevation={10}
                variant='filled'
                severity={alert.type}
            >
                {alert.message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Alert