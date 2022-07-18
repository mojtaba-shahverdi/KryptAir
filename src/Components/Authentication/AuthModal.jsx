import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { grey, teal } from '@mui/material/colors';
import Login from './Login';
import Signup from './Signup';
import { makeStyles } from '@mui/styles';
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: grey[700],
    boxShadow: 24,
    borderRadius: 2,
};
const useStyles = makeStyles({
    google: {
        padding: 24,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        gap: 20,
        fontSize: 20,
    }
})
const paper = {
    color: 'white',
}
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const AuthModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { setAlert } = CryptoState() 

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(res => {
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${res.user.email}`,
                type: 'success',
            })

            handleClose()
        }).catch(error => {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            })
            return
        })
    }

    const classes = useStyles()

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant='contained'
                style={{
                    width: 85,
                    height: 40,
                }}
            >
                Login
            </Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={paper}>
                        <AppBar position="static" style={{ background: 'transparent' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                style={{ background: 'transparent' }}
                            >
                                <Tab label="Login" {...a11yProps(0)} />
                                <Tab label="Sign Up" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                        <Box className={classes.google}>
                            <span>OR</span>
                            <GoogleButton
                                style={{ width: '100%', outline: 'none' }}
                                onClick={signInWithGoogle}
                            />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AuthModal
