"use client";

import ScrollToTop from "@/components/ScrollTop";
import MainNavigate from "@/components/MainNavigate";
import { GlobalContextProvider } from "@/context/GlobalContext";
import AppDownloadModal from "@/components/common/AppDownloadModal";
import React from "react";
import { AppDownloadModalContextProvider } from "@/context/AppDownloadModalContext";

export const ClientLayout = ({ children }) => {
  return (
    <>
      <MainNavigate />
      <ScrollToTop />
      <AppDownloadModalContextProvider>
        <AppDownloadModal />
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </AppDownloadModalContextProvider>
    </>
  );
};
