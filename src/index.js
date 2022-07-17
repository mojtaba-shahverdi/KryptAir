import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.Fragment>
);
