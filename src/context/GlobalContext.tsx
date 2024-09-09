"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { getApi } from "@/utils/apis";

interface GlobalContextType {
  gnbs: GnbType[];
  deepLink: string;
  setDeepLink: (deepLink: string) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  gnbs: [],
  deepLink: "",
  setDeepLink: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [deepLink, setDeepLink] = useState("");
  const [gnbs, setGnbs] = useState<GnbType[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getApi<GnbType[]>("/api/v1/ui/gnb");
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
