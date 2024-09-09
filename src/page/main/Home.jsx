"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/context/GlobalContext";
import { getApiUrl } from "@/common/CommonUtils";
import Main from "../../page/main/Main";

const Home = () => {
  const { gnbs } = useContext(GlobalContext);
  const url = usePathname();
  const [apiUrl, setApiUrl] = useState(null);

  useEffect(() => {
    if (gnbs && gnbs.length > 0) {
      getApiUrl(gnbs).then((res) => {
        if (res === "/") {
          window.location.href = "/home/10001";
        } else {
          setApiUrl(res);
        }
      });
    }
  }, [url, gnbs]);

  return (
    <>
      <Main apiUrl={apiUrl} />
    </>
  );
};

export default Home;
