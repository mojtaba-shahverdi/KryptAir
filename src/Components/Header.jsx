import React from 'react'
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { teal } from '@mui/material/colors'
import { CryptoState } from '../CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './Authentication/UserSidebar'

const useStyles = makeStyles({
    title: {
        flex: 1,
        color: '#41b3a3',
        fontFamily: 'Montserrat !important',
        fontWeight: 'bold !important',
        cursor: 'pointer',
        '@media (max-width:500px)':{
            fontSize: '20px !important',
        }
    },
    buttons:{
        display: 'flex',
        '@media (max-width:500px)':{
            marginTop:10,
            flexDirection: 'column',
            justifyContent: 'center',
            '& button':{
                margin:'10px 0',
            }
        }
    },
    pairs:{
        '@media (max-width:500px)':{
            marginRight: '0 !important'
        }
    }
})

const Header = () => {
    
    const classes = useStyles()
    const navigate = useNavigate()
    
    const { currency, setCurrency, user } = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: teal.A700,
            },
            mode: 'light',
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate('/')} className={classes.title} variant='h5'>KryptAir</Typography>
                        <div className={classes.buttons}>
                        <Select variant='outlined' style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                        value={currency}
                        className={classes.pairs}
                        onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>$ USD</MenuItem>
                            <MenuItem value={'EUR'}>€ EUR</MenuItem>
                            <MenuItem value={'GBP'}>£ GBP</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModal />}
                            </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header