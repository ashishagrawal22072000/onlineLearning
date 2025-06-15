import React, { useEffect, useState } from "react";
import Header from "../../components/header/index.js";

const Index = () => {
  const localData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div>
        <Header />
        <div className="container my-4">
          <h1>Hello, {localData?.username}</h1>
        </div>
      </div>
    </>
  );
};

export default Index;
