import React, { createContext } from "react";

const authContext = createContext({
  isVerified: false,
  setIsVerified: () => {},
});

export default authContext;
