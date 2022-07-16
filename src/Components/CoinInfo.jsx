import { makeStyles } from '@mui/styles'
import { teal } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    // [theme.breakpoints.down('md')]: {
    //   width: '100%',
    //   marginTop: 0,
    //   padding: 20,
    //   paddingTop: 0,
    // },
  },
}))

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricData(data.prices)
  }

  useEffect(() => {
    fetchHistoricalData()
  }, [currency, days])
  console.log('data', historicData)
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: teal.A700,
      },
      mode: 'dark',
    },
  })


  const classes = useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicData ? (
            <CircularProgress
              style={{ color: teal[200] }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0])
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`
                    return days === 1 ? time : date.toLocaleDateString()
                  }),
                  datasets: [{ data: historicData.map((coin => coin[1])) }]
                }}
              />
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo