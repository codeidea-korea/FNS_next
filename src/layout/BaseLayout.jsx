"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../page/common/Header";
import Quickmenu from "../page/common/Quickmenu";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "./GlobalContext";
import GlobalAppDownModal from "../common/AppDownModalUtil";

const BaseLayout = ({ title, gnbHide, children }) => {
  const { gnb } = useGlobalContext();
  const url = usePathname();
  const [usGnbHide, setUsGnbHide] = useState(gnbHide);
  const [usIsContainGnb, setUsIsContainGnb] = useState(null);

  useEffect(() => {
    if (gnb && gnb.length > 0) {
      const pathname = window.location.pathname;
      const pathSplitSlash = pathname.split("/");
      const key1 = pathSplitSlash[pathSplitSlash.length - 2];
      const key2 = decodeURIComponent(
        pathSplitSlash[pathSplitSlash.length - 1]
      );

      /* 현재 접속한 URL과 gnb를 이용하여 헤더 메뉴 노출 여부를 판단 */
      const getIsGnbHide = async () => {
        let gnbHide = true;

        if (["/home/10001", "/home/10002", "/home/10003"].includes(url)) {
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

      gnb.map((item) => {
        if (item.gnb_vw_type_cd === "VW002003") {
          if (item.gnb_param_value === key1 && item.gnb_name === key2) {
            isContainGnb = true;
            return false;
          }
        }
      });

      setUsIsContainGnb(isContainGnb);
    }
  }, [gnb, url]);

  /*useEffect(() => {
        /!* URL에서 %20을 -로 대체 *!/
        const url = new URL(decodeURIComponent(window.location.href));

        // URL의 pathname과 search 부분에서 %20을 -로 대체
        const updatedPathname = url.pathname.replace(/%20/g, '-');
        const updatedSearch = url.search.replace(/%20/g, '-');

        // 업데이트된 URL 생성
        const newUrl = `${url.origin}${updatedPathname}${updatedSearch}${url.hash}`;

        // 브라우저의 URL을 변경 (페이지를 다시 로드하지 않음)
        window.history.replaceState(null, '', newUrl);
    }, [url]);*/

  return (
    <>
      <GlobalAppDownModal />
      <Header
        title={title}
        gnbHide={usGnbHide}
        isContainGnb={usIsContainGnb}
      />{" "}
      {/* 헤더 */}
      {children}
      <Quickmenu /> {/* 퀵메뉴 */}
    </>
  );
};

export default BaseLayout;
