"use client";

import { createContext, useState } from "react";
import { isMobileFn } from "@/components/common/AppDownloadModal";
import { clickUseApp } from "@/utils/common";

export const AppDownloadModalContext = createContext({
  show: false,
  open: (deepLink) => {},
  close: () => {},
});

export function AppDownloadModalContextProvider({ children }) {
  const [show, setShow] = useState(false);

  function open(deepLink, directToApp = true) {
    if (isMobileFn() && directToApp) {
      clickUseApp(deepLink);
      return;
    }

    const { body } = document;
    if (!body.getAttribute("scrollY")) {
      const pageY = window.scrollY;
      window.scrollTo(0, pageY + 1);

      setTimeout(() => {
        body.setAttribute("scrollY", pageY.toString());
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${pageY}px`;
        body.style.left = "0px";
        body.style.right = "0px";
        body.style.bottom = "0px";

        setShow(true);
      }, 10);
    }
  }

  function close() {
    const { body } = document;

    if (body.getAttribute("scrollY")) {
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      body.style.removeProperty("bottom");

      window.scrollTo(0, Number(body.getAttribute("scrollY")) + 2);

      body.removeAttribute("scrollY");

      setShow(false);
    }
  }

  return (
    <AppDownloadModalContext.Provider value={{ show, open, close }}>
      {children}
    </AppDownloadModalContext.Provider>
  );
}
