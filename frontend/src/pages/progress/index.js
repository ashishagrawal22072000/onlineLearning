import React, { useEffect, useState } from "react";

import { user } from "../../api/user.js";
import Header from "../../components/header";
const Index = () => {
  const [data, setData] = useState({});
  const getProgressPercentage = async () => {
    try {
      const res = await user.getProgressPercentage();
      if (res.success) {
        setData(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProgressPercentage();
  }, []);

  return (
    <>
      <Header />
      <div className="container py-5 ">
        <h1>Progress</h1>

        <p>Easy: {data?.easy}%</p>
        <p>Medium: {data?.medium}%</p>
        <p>Hard: {data?.hard}%</p>
      </div>
    </>
  );
};

export default Index;
