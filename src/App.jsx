import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header';
import Home from './Pages/Home';
import CoinPage from './Pages/CoinPage'
import { makeStyles } from '@mui/styles';
import Alert from './Components/Alert'

const useStyles = makeStyles({
  App: {
//     background: '#e3e2df',
    // backgroundImage: 'linear-gradient(to right bottom, #7ec6ba, #7fc7bd, #80c9c0, #82cac3, #83cbc6, #7ecac4, #7ac8c3, #75c7c1, #69c2ba, #5cbdb2, #4fb8ab, #41b3a3)',
    color: 'white',
    minHeight: '100vh',
  },
});
function App(props) {

  

  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  )
}

export default App;
