import { teal } from "@mui/material/colors";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
// import axios from 'axios'
import React, { useEffect, useState } from "react";
// import { CoinList } from '../config/api'
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Loading } from "../assets";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles = makeStyles({
  row: {
    cursor: "pointer",
    borderBottom: "2px solid #85cdca",
    "& .MuiTableCell-root": {
      borderBottom: "2px solid #85cdca",
    },
    "&:hover": {
      transition: "1s",
      background: "rgba(255, 255, 255, 0.6)",
      // borderRadius: '16px',
      boxShadow: "0 4px 30px rgb(0 0 0 / 10%)",
      backdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: teal[300],
    },
  },
  container: {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgb(0 0 0 / 10%)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    margin: 30,
    width: "95% !important",
    "& h4": {
      "@media (max-width:500px)": {
        fontSize: 20,
      },
    },
  },
});
const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: teal.A700,
      },
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }} className={classes.container}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat", color: "#41b3a3" }}
        >
          Cryptocurrency prices by Market Cap
        </Typography>
        <TextField
          label="Search Any Crypto..."
          variant="outlined"
          className={classes.input}
          style={{ marginBottom: 20, width: "100%", color: "#000" }}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{
            style: {
              color: "#41b3a3",
            },
          }}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: teal.A100 }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead
                style={{
                  background: "transparent",
                  borderBottom: "5px solid #41b3a3",
                }}
              >
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        border: "none",
                      }}
                      key={head}
                      align={"left"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            borderBottom: "none",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "#008774",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "#000" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ color: "#008774", fontSize: 18 }}
                        >
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ color: "#008774", fontSize: 18 }}
                        >
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={coins?.length / 10}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
