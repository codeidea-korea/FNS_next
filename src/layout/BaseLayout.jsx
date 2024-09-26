"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "@/page/common/Header";
import Quickmenu from "@/page/common/Quickmenu";
import { usePathname } from "next/navigation";
import { GlobalContext } from "@/context/GlobalContext";

const BaseLayout = (props) => {
  const { gnbs } = useContext(GlobalContext);
  const url = usePathname();
  const [usGnbHide, setUsGnbHide] = useState(props.gnbHide);
  const [usIsContainGnb, setUsIsContainGnb] = useState(null);

  useEffect(() => {
    if (gnbs && gnbs.length > 0) {
      const pathname = window.location.pathname;
      const pathSplitSlash = pathname.split("/");
      const key1 = pathSplitSlash[pathSplitSlash.length - 2];
      const key2 = decodeURIComponent(
        pathSplitSlash[pathSplitSlash.length - 1],
      );

      /* 현재 접속한 URL과 gnb를 이용하여 헤더 메뉴 노출 여부를 판단 */
      const getIsGnbHide = async () => {
        let gnbHide = true;

        if (["/", "/home/10002", "/home/10003"].includes(url)) {
          gnbHide = false;
        } else {
          if (
            url.includes("/home/tag/") &&
            key1?.length > 0 &&
            key2?.length > 0
          ) {
            gnbHide = false;
          }
        }

        return gnbHide;
      };

      /* gnb 메뉴를 보여줄건지 말건지 */
      getIsGnbHide().then((res) => {
        setUsGnbHide(res);
      });

      /* 접속한 url에 gnb에 포함되는지 아닌지 */
      let isContainGnb = false;

      gnbs.map((item) => {
        if (item.gnb_vw_type_cd === "VW002003") {
          if (item.gnb_param_value === key1 && item.gnb_name === key2) {
            isContainGnb = true;
            return false;
          }
        }
      });

      setUsIsContainGnb(isContainGnb);
    }
  }, [gnbs, url]);

  return (
    <>
      <Header
        title={props.title}
        gnbHide={usGnbHide}
        isContainGnb={usIsContainGnb}
      />
      {props.children}
      <Quickmenu />
    </>
  );
};

export default BaseLayout;
