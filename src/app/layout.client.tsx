"use client";

import ScrollToTop from "@/components/ScrollTop";
import { GlobalContextProvider } from "@/context/GlobalContext";
import AppDownloadModal from "@/components/common/AppDownloadModal";
import React, { ReactNode } from "react";
import { AppDownloadModalContextProvider } from "@/context/AppDownloadModalContext";

interface Props {
  children: ReactNode;
}

export const ClientLayout = (props: Props) => {
  return (
    <>
      <ScrollToTop />
      <AppDownloadModalContextProvider>
        <AppDownloadModal />
        <GlobalContextProvider>{props.children}</GlobalContextProvider>
      </AppDownloadModalContextProvider>
    </>
  );
};
