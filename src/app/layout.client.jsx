"use client";

import { useEffect } from "react";
import Lottie from "lottie-react";
import LottieLogo from "../assets/json/logo.json";
import ScrollToTop from "@/components/ScrollTop";
import MainNavigate from "@/components/MainNavigate";
import { GlobalProvider } from "@/layout/GlobalContext";

export const ClientLayout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("lottie").classList.add("off");
    }, 1500);
  }, []);

  return (
    <>
      <MainNavigate />
      <div id="lottie">
        <Lottie className="lottie_logo" animationData={LottieLogo} />
      </div>
      <ScrollToTop />
      <GlobalProvider>{children}</GlobalProvider>
    </>
  );
};
