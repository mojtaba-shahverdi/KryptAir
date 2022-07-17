import * as React from 'react'
import axios from 'axios'
import { CoinList } from './config/api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const Crypto = React.createContext()

const CryptoContext = ({ children }) => {

  const [currency, setCurrency] = React.useState('USD')
  const [symbol, setSymbol] = React.useState('$')
  const [coins, setCoins] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    type: 'success',
  })

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user) setUser(user)
      else setUser(null)
    })
  }, [])

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))

    setCoins(data)
    setLoading(false)
  }

  React.useEffect(() => {
    if (currency === 'USD') setSymbol('$')
    else if (currency === 'EUR') setSymbol('€')
    else if (currency === 'GBP') setSymbol('£')
  }, [currency])

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return React.useContext(Crypto)
}