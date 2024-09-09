"use client";

import { createContext, ReactNode, useState } from "react";

interface AppDownloadModalContextType {
  show: boolean;
  open: () => void;
  close: () => void;
}

export const AppDownloadModalContext =
  createContext<AppDownloadModalContextType>({
    show: false,
    open: () => {},
    close: () => {},
  });

export function AppDownloadModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  function open() {
    console.log("hihi");
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
