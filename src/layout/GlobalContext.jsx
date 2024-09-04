import React, { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance.jsx";

const GlobalContext = createContext({});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [gnb, setGnb] = useState([]);

  useEffect(() => {
    // gnb 메뉴 데이터 조회
    const getGnb = async () => {
      try {
        const result = await AxiosInstance.get("/api/v1/ui/gnb");
        return result.data.data;
      } catch (error) {
        console.error("Error fetching gnb:", error);
      }
    };

    getGnb().then((res) => {
      setGnb(res);
    });
  }, [setGnb]);

  return (
    <GlobalContext.Provider value={{ gnb }}>{children}</GlobalContext.Provider>
  );
};
