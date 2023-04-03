import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    width: "95%",
    margin: "auto",
  },
  bannerContent: {
    // background: 'rgba(255, 255, 255, 0.2)',
    // borderRadius: '16px',
    // boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
    // backdropFilter: 'blur(5px)',
    // border: '1px solid rgba(255, 255, 255, 0.3)',
    // padding: '25px 0 !important',
    // height: 400,
    marginTop: 30,
    display: "flex",
    // flexDirection: 'column',
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    // flexDirection: 'column',
    justifyContent: "space-between",
    // textAlign: 'center',
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
