"use client";

import Lottie from "lottie-react";
import LottieLogo from "../assets/json/logo.json";
import React, { useEffect, useState } from "react";

/* 접속 url 혹은 메뉴를 이용하여 해당 페이지에서 호출할 api url을 조회 */
export const getApiUrl = async () => {
  const mainGnbIds = ["/home/10001", "/home/10002", "/home/10003"]; // 기본 메인 메뉴 3개
  const pathname = window.location.pathname;
  const pathSplitSlash = pathname.split("/");

  let apiUrl;

  if (mainGnbIds.includes(pathname)) {
    apiUrl = `/api/v1/ui/view/${pathSplitSlash[pathSplitSlash.length - 1]}`;
  } else {
    apiUrl = `/api/v1/ui/viewpage/tag/${
      pathSplitSlash[pathSplitSlash.length - 2]
    }`;
  }

  return apiUrl;
};

/* 포스트 상세에서 시간을 표시할 때 사용하는 함수 */
export const formatDateString = (postedTimeStr) => {
  const postedTime = new Date(postedTimeStr);
  const now = new Date();
  const difference = now - postedTime;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (days < 1) {
    if (seconds < 60) {
      return `${seconds}초 전`;
    }

    if (minutes < 60) {
      return `${minutes}분 전`;
    }

    if (hours < 24) {
      return `${hours}시간 전`;
    }
  }

  if (days < 7) {
    return `${days}일 전`;
  }

  if (days < 30) {
    return `${weeks}주 전`;
  }

  if (now.getFullYear() !== postedTime.getFullYear()) {
    return `${postedTime.getFullYear()}년 ${
      postedTime.getMonth() + 1
    }월 ${postedTime.getDate()}일`;
  }

  if (days >= 30) {
    return `${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
  }

  return `${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
};

/* 로딩 에니메이션 효과를 보여주고 0.6초 후 제거 */
export const showLoadingAnimation = () => {
  const LoadingComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
      <div id="loading_lottie">
        <Lottie speed={5} className="lottie_logo" animationData={LottieLogo} />
      </div>
    );
  };
};
