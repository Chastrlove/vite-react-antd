import React, { useContext } from "react";

export const AccessContext = React.createContext({});

export const useAccess = () => {
  return useContext(AccessContext);
};
