"use client";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePathname, useRouter } from "next/navigation";
import { AppDownloadModalContext } from "@/context/AppDownloadModalContext";
import { GlobalContext } from "@/context/GlobalContext";

const Header = ({ title, gnbHide, isContainGnb }) => {
  const { open } = useContext(AppDownloadModalContext);
  const { deepLink, gnbs } = useContext(GlobalContext);
  const [newGnb, setNewGnb] = useState([]);
  const url = decodeURIComponent(usePathname());
  const navigate = useRouter();
  const [lineWidth, setLineWidth] = useState(0);
  const [lineLeft] = useState(16);
  const [lastScroll, setLastScroll] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector(".gnb_swiper .active")) {
        setLineWidth(
          document.querySelector(".gnb_swiper .active")?.clientWidth - 32,
        );
      }
    }, 100);

    window.addEventListener("resize", () => {
      categoryPosition(document.querySelector(".gnb_swiper .active"));
    });
  }, [url]);

  useEffect(() => {
    if (gnbs?.length > 0) {
      const copyGnb = [...gnbs];

      /* home 메뉴인데 gnb에 없는 메뉴이면 9번째 메뉴 생성 */
      if (gnbHide === false && isContainGnb === false) {
        const pathname = window.location.pathname;
        const pathSplitSlash = pathname.split("/");
        const key1 = pathSplitSlash[pathSplitSlash.length - 2];
        let key2 = decodeURIComponent(
          pathSplitSlash[pathSplitSlash.length - 1],
        );
        key2 = key2.replaceAll("-", " ");

        if (
          pathSplitSlash.length === 5 &&
          key1?.length > 1 &&
          key2?.length > 1
        ) {
          const newSlide = {
            gnb_vw_id: Date.now().toString(),
            gnb_param_value: key1,
            gnb_name: key2,
            gnb_vw_type_cd: "",
          };

          copyGnb.push(newSlide);
        }
      }

      setNewGnb(copyGnb);
    }
  }, [gnbs, url, isContainGnb]);

  // gnb swiper가 만들어 졌을 때 실행
  useEffect(() => {
    if (swiperInstance?.slides?.length > 7) {
      // active된 gnb swiper로 슬라이드를 이동시킴
      const slides = document.querySelectorAll(".swiper-slide");
      const activeSlideIndex = Array.from(slides).findIndex((slide) =>
        slide.classList.contains("active"),
      );
      swiperInstance.slideTo(activeSlideIndex, 1);
    }
  }, [swiperInstance?.slides]);

  // gnb swiper의 onSwiper 이벤트
  const handleSwiper = (swiper) => {
    setSwiperInstance(swiper);
  };

  // gnb 메뉴 클릭 이벤트
  const clickGnb = (gnbVwTypeCd, gnbVwId, gnbParamValue, gnbName) => {
    navigate.push(getMenuLink(gnbVwId, gnbParamValue, gnbName));
  };

  // 메뉴에 적용시킬 active class
  const getMenuClassName = (gnbVwId, gnbParamValue, gnbName) => {
    const linkUrl = getMenuLink(gnbVwId, gnbParamValue, gnbName);
    const replaceUrl = url.replaceAll("-", " ");
    if (
      linkUrl === replaceUrl ||
      (replaceUrl === "/" && linkUrl === "/home/10001")
    ) {
      return "active";
    } else {
      return "";
    }
  };

  // 메뉴에 적용시킬 underline i tag
  const getUnderLine = (gnbVwId, gnbParamValue, gnbName) => {
    const linkUrl = getMenuLink(gnbVwId, gnbParamValue, gnbName);
    const replaceUrl = url.replaceAll("-", " ");

    if (
      linkUrl === replaceUrl ||
      (replaceUrl === "/" && linkUrl === "/home/10001")
    ) {
      return (
        <i
          className="underline"
          style={{ width: `${lineWidth}px`, left: `${lineLeft}px` }}
        ></i>
      );
    } else {
      return "";
    }
  };

  // 메뉴에 적용시킬 link url
  const getMenuLink = (gnbVwId, gnbParamValue, gnbName) => {
    if (["10001", "10002", "10003"].includes(gnbVwId)) {
      return `/home/${gnbVwId}`;
    } else if (gnbParamValue && gnbName) {
      return `/home/tag/${gnbParamValue}/${gnbName}`;
    } else {
      return `/home/10001`;
    }
  };

  // gnb 메뉴 클릭 이벤트
  const cateClick = (e) => {
    // 타겟 이동시키기
    categoryPosition(e.currentTarget);

    // underline 값 수정
    setLineWidth(e.currentTarget.clientWidth - 32);
  };

  // gnb 클릭시 위치 이동
  const categoryPosition = (target) => {
    const swiper = document.querySelector(".gnb_swiper");
    const swiperWrap = document.querySelector(".gnb_swiper .swiper-wrapper");
    const lastSwiper = swiperWrap.querySelector(".swiper-slide:last-of-type");
    const swiperSize = lastSwiper.offsetLeft + lastSwiper.clientWidth; // swiper 전체 길이

    const targetSize = target.clientWidth; // 타겟 width값
    const targetPosition = target.offsetLeft; // 타겟 left 값
    const maxSwiper = swiperSize - swiper.clientWidth; // swiper 할수있는 최대 공간

    const changePosition =
      -targetPosition + swiper.clientWidth / 2 - targetSize / 2; // 타겟 화면 정중앙에 놓기

    setTimeout(() => {
      // 스와이프 할 수 있을때
      if (swiper.clientWidth < swiperSize) {
        // 포지션이 음수일때
        if (changePosition < 0) {
          if (changePosition < maxSwiper * -1) {
            // 마지막으로 고정
            swiperWrap.style.transform = `translate3d(${
              maxSwiper * -1
            }px, 0, 0)`;
          } else {
            // 가운데로 이동
            swiperWrap.style.transform = `translate3d(${changePosition}px, 0, 0)`;
          }
        } else {
          // 맨 앞으로 고정
          swiperWrap.style.transform = `translate3d(0, 0, 0)`;
        }
      } else {
        // 맨앞으로 고정
        swiperWrap.style.transform = `translate3d(0, 0, 0)`;
      }
    }, 10);
    swiperWrap.style.transitionDuration = "500ms";
  };

  const headerScroll = () => {
    const currentScrollY = window.scrollY;
    // 스크롤 DOWN 했을때
    if (lastScroll < currentScrollY) {
      document.querySelector("header").classList.add("header_mini");
    } else {
      document.querySelector("header").classList.remove("header_mini");
    }
    setLastScroll(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", headerScroll);
    return () => {
      window.removeEventListener("scroll", headerScroll);
    };
  }, [lastScroll]);

  return (
    <>
      <header>
        <div
          className={
            title || gnbHide === true ? "top_area border_type" : "top_area"
          }
        >
          {title && title !== "" ? (
            <div className="title">{title}</div>
          ) : (
            <div className="appdown_box">
              <h1 className="logo">
                <img src="/img/fns.svg" alt="패션&스타일 로고" />
                <span style={{ textAlign: "left" }}>
                  새로운 패션, 트렌드, 스타일링 팁<br />
                  패션 & 스타일에서 만나보세요!
                </span>
              </h1>
              <button
                type={"button"}
                onClick={() => {
                  open(deepLink, false);
                }}
              >
                앱으로 보기
              </button>
            </div>
          )}
        </div>

        <h1 className={title || gnbHide === true ? "logo hidden" : "logo"}>
          <img src="/img/fns.svg" alt="" />
        </h1>
        <nav className={title || gnbHide === true ? "gnb hidden" : "gnb"}>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={0}
            className="gnb_swiper"
            onSwiper={handleSwiper}
          >
            {newGnb?.length > 0 &&
              newGnb.map((item) => {
                return (
                  <SwiperSlide
                    key={item.gnb_vw_id}
                    className={getMenuClassName(
                      item.gnb_vw_id,
                      item.gnb_param_value,
                      item.gnb_name,
                    )}
                    onClick={cateClick}
                  >
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        clickGnb(
                          item.gnb_vw_type_cd,
                          item.gnb_vw_id,
                          item.gnb_param_value,
                          item.gnb_name,
                        )
                      }
                    >
                      <span>{item.gnb_name}</span>
                      {getUnderLine(
                        item.gnb_vw_id,
                        item.gnb_param_value,
                        item.gnb_name,
                      )}
                    </a>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </nav>
      </header>
    </>
  );
};

export default Header;
