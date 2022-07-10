import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header';
import Home from './Pages/Home';
import CoinPage from './Pages/CoinPage'
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  App: {
    background: '#14161a',
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
    </BrowserRouter>
  );
}

export default App;
