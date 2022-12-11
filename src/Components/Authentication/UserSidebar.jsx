/* eslint-disable array-callback-return */
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles'
import { grey, red, teal } from '@mui/material/colors';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../../Pages/CoinPage';
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

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
        borderRadius: '10px 3px 3px 10px ',
        padding: 15,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    coin: {
        padding: '0 5px',
        borderRadius: 5,
        color: 'black',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: teal[200],
        boxShadow: '0 0 3px #80cbc4',
        cursor: "pointer",
        borderBottom: '1px solid rgba(81, 81, 81, 1)',
        "&:hover": {
            transition: '0.7s',
            backgroundColor: teal.A700,
        },
    },
    delete:{
        "&:hover": {
            transition: '0.3s',
            fill: red.A700,
        },
    },
    button:{
        display: 'flex',
        justifyContent: 'center',
        '@media (max-width:500px)':{
            margin: '10px 0'
        }
    }
})

const UserSidebar = () => {
    const [state, setState] = React.useState({ right: false });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState()

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    }

    const navigate = useNavigate()

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, 'watchlist', user.uid)

        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin?.id)
            },
                { merge: 'true' }
            )

            setAlert({
                open: true,
                message: `${coin.name} Removed from WatchList !`,
                type: 'success',
            })
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            })
        }
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
        <div className={classes.button}>
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
                                    onClick={toggleDrawer(anchor, true)}
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
                                    <span
                                        style={{
                                            fontSize: 15,
                                            textShadow: '0 0 5px black',
                                            position: 'sticky',
                                            top: 0,
                                            width: '100vw',
                                            textAlign: 'center',
                                            background: grey[500],
                                            padding: 10,
                                        }}
                                    >
                                        WatchList
                                    </span>
                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <div
                                                    key={coin.id} 
                                                    className={classes.coin}
                                                    onClick={() => navigate(`../coins/${coin.id}`)}
                                                    onMouseUpCapture={toggleDrawer(anchor, false)}
                                                >
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <img style={{width: 35, marginRight: 5, padding: 5}} src={coin.image} alt={coin.name} />
                                                    <span>{coin.name}</span>
                                                    </div>
                                                    <span style={{ display: 'flex', gap: 8 }}>
                                                        {symbol}
                                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                                        <AiFillDelete
                                                            className={classes.delete}
                                                            fontSize='16'
                                                            onClick={() => removeFromWatchlist(coin)}
                                                            onMouseUpCapture={toggleDrawer(anchor, true)}
                                                        />
                                                    </span>
                                                </div>
                                            )
                                    })}
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
