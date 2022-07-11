import { teal } from '@mui/material/colors'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Classnames } from 'react-alice-carousel'
import { useNavigate } from 'react-router-dom'

const CoinsTable = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState()
    const navigate = useNavigate()

    const { currency } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)
    }
    console.log(coins)
    useEffect(() => {
        fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: teal.A700,
            },
            mode: 'dark',
        },
    })

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }

    // const useStyles = makeStyles({
    //     row: {
    //         backgroundColor: "#16171a",
    //         cursor: "pointer",
    //         "&:hover": {
    //             backgroundColor: "#131111",
    //         },
    //         fontFamily: "Montserrat",
    //     },
    //     pagination: {
    //         "& .MuiPaginationItem-root": {
    //             color: "gold",
    //         },
    //     },
    // });

    // const classes = useStyles()

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: 'Montserrat' }}
                >
                    Cryptocurrency prices by Market Cap
                </Typography>
                <TextField label="Search Any Crypto..." variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ background: teal.A700 }} />
                    ) : (
                        <Table>
                            <TableHead style={{ background: teal[500], marginTop: '10%', width: '10%' }}>
                                <TableRow>
                                    {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                        <TableCell
                                            style={{
                                                color: 'black',
                                                fontWeight: '700',
                                                fontFamily: 'Montserrat',
                                            }}
                                            key={head}
                                            align={head === 'Coin' ? '' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coins
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() => navigate.push(`/coins/${row.id}`)}
                                                // className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                    style={{
                                                        display: 'flex',
                                                        gap: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: 'uppercase',
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: 'darkgrey'
                                                            }}
                                                        >
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                               
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>

                        </Table>
                    )}
                </TableContainer>
            </Container>
        </ThemeProvider>

    )
}

export default CoinsTable