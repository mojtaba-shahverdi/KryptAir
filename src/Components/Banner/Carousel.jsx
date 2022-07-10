import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from '../../config/api'

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
    },
}))

const Carousel = () => {

    const [trending, setTrending] = useState([])
    const classes = useStyles()

    const { currency } = CryptoState()

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))

        setTrending(data)
    }

    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])
    

  return (
    <div className={classes.carousel}>Carousel</div>
  )
}

export default Carousel