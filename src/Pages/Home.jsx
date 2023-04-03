import React from "react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable";
import Loading from "../assets/Loading.gif";
const Home = () => {
  return (
    <>
      {Banner ? (
        <>
          <Banner />
          <CoinsTable />
        </>
      ) : (
        <img src={Loading} alt="Loading" />
      )}
    </>
  );
};

export default Home;
