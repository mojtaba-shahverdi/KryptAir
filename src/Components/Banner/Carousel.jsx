import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { Loading, Logo } from "../../assets";

const useStyles = makeStyles((theme) => ({
  display: "flex",
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    width: "80%",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgb(0 0 0 / 10%)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "25px 0 !important",
    "@media (max-width:700px)": {
      width: "70%",
    },
    "@media (max-width:500px)": {
      width: "100%",
    },
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
  header: {
    width: "15%",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgb(0 0 0 / 10%)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "25px 0 !important",
    color: "#41b3a3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      textAlign: "center",
    },
    "@media (max-width:700px)": {
      width: "20%",
    },
    "@media (max-width:500px)": {
      width: "100%",
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 !important",
    "@media (max-width:500px)": {
      flexDirection: "column-reverse",
    },
  },
}));

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))g, ','/);
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const { currency, symbol, loading } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{ color: "#000" }}>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "#0ecb81" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, color: "#000" }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.carousel}>
        {loading ? (
          <img
            src={Loading}
            width="10%"
            style={{ margin: "auto" }}
            alt="Loading"
          />
        ) : (
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
          />
        )}
      </div>
      <div className={classes.header}>
        <img src={Logo} width={80} alt="Crypto Currency Prices" />
        <h4 style={{ marginTop: 10 }}>Crypto Price Tracker</h4>
      </div>
    </div>
  );
};

export default Carousel;
