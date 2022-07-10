import React from 'react'
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { teal } from '@mui/material/colors'
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles({
    title: {
        flex: 1,
        color: teal[300],
        fontFamily: 'Montserrat !important',
        fontWeight: 'bold !important',
        cursor: 'pointer',
    },
})

const Header = () => {
    
    const classes = useStyles()
    const navigate = useNavigate()
    
    const { currency, setCurrency } = CryptoState()

    console.log(currency)
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: teal.A700,
            },
            mode: 'dark',
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate('/')} className={classes.title} variant='h5'>Crypto Scan</Typography>
                        <Select variant='outlined' style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>$ USD</MenuItem>
                            <MenuItem value={'EUR'}>€ EUR</MenuItem>
                            <MenuItem value={'GBP'}>£ GBP</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header