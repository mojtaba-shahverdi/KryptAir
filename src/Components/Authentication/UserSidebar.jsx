import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { grey, teal } from '@mui/material/colors';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
    },
    profile: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        height: '92%',
    },
    watchlist: {
        flex: .94,
        width: '100%',
        background: grey[500],
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        overFlowY: 'scroll',
    },
})

const UserSidebar = () => {
    const [state, setState] = React.useState({ right: false });

    const { user, setAlert } = CryptoState()

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    }

    const logOut = () => {
        signOut(auth)
        setAlert({
            open: true,
            type: 'success',
            message: 'Logout Successfull !'
        })

        toggleDrawer()
    }

    const classes = useStyles()

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: 'pointer',
                            background: teal[500]
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        cursor: 'pointer',
                                        background: teal.A400,
                                        objectFit: 'contain',
                                    }}
                                />
                                <span
                                    style={{
                                        width: '100%',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        fontWeight: 'bolder',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    WatchList
                                </div>
                            </div>
                            <Button
                                variant='contained'
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default UserSidebar
