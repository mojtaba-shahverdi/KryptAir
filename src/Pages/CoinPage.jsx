import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { SingleCoin } from '../config/api'
import { makeStyles } from '@mui/styles'
import CoinInfo from '../Components/CoinInfo'
import { Typography } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  sidebar: {
    width: '30%',
    // [theme.breakpoints('md')]: {
      //   width: '100%',
      // },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
  })) 
  
  const CoinPage = () => {
    
    const { id } = useParams()
    const [coin, setCoin] = useState()
    
    const { currency, symbol } = CryptoState()
    
    
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id))
      
      setCoin(data)
    }
    
    useEffect(() => {
      fetchCoin()
      console.log(coin)
    }, [])
  
  const classes = useStyles()
  
  return (
    <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height='200'
            style={{ marginBottom: 20 }}
            />
          <Typography variant='h3' className={classes.heading}>
            {coin?.name}
          </Typography>
          <div>
            {coin?.description.en}
          </div>
        </div>
        <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage