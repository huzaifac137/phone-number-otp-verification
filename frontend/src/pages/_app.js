import Router from "next/router";
import React, { createContext, useEffect, useState } from "react";
import authContext from "@/CONTEXT/authContext";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
const Auth = ({ Component, pageProps }) => {
  const [isVerified, setIsVerified] = useState(false);

  const setVerified = (val) => {
    setIsVerified(val);
  };

  useEffect(() => {
    if (isVerified === false) {
      Router.push("/auth/verify");
    }

    Router.push("/");
  }, [isVerified]);

  return (
    <authContext.Provider
      value={{ isVerified: isVerified, setIsVerified: setVerified }}
    >
      <Component {...pageProps} />
      <ToastContainer />
    </authContext.Provider>
  );
};

export default Auth;
