"use client";

import { createContext, useEffect, useState } from "react";
import { getApi } from "@/utils/apis";

export const GlobalContext = createContext({
  gnbs: [],
  deepLink: "",
  setDeepLink: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [deepLink, setDeepLink] = useState("");
  const [gnbs, setGnbs] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getApi("/api/v1/ui/gnb");
        setGnbs(response.data.data ?? []);
      } catch (error) {
        console.error("Error fetching gnb:", error);
      }
    };
    run().then();
  }, []);

  return (
    <GlobalContext.Provider value={{ gnbs, deepLink, setDeepLink }}>
      {children}
    </GlobalContext.Provider>
  );
};
