"use client";

import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import { AppDownloadModalContext } from "@/context/AppDownloadModalContext";
import { clickUseApp, isMobileFn } from "@/utils/common";

export default function AppDownloadModal() {
  const { deepLink } = useContext(GlobalContext);
  const { show, close } = useContext(AppDownloadModalContext);

  function clickUseAppEvent(): void {
    clickUseApp(deepLink);
    close();
  }

  if (isMobileFn()) {
    return (
      <div className={"modal_wrap " + (show ? "open" : "")}>
        <div className="modal_bg" onClick={close}></div>
        <div className="modal_box">
          <div className="modal_content appdown_cont">
            <img src="/img/app_logo.png" alt="패션&스타일 로고" />
            <h6>
              패션 & 스타일 앱에서
              <br />
              트렌디한 패션 정보를 확인해보세요.
            </h6>
            <p>실시간 패션 트렌드, 라이프 & 셀럽 스타일을 쉽고 빠르게!</p>
            <button
              type={"button"}
              className="down_btn"
              onClick={clickUseAppEvent}
            >
              앱으로 보기
            </button>
            <button type={"button"} className="close_btn" onClick={close}>
              웹으로 볼게요
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"modal_wrap " + (show ? "open" : "")}>
        <div className="modal_bg" onClick={close}></div>
        <div className="modal_box center_box">
          <div className="modal_content appdown_pc_cont">
            <div className="img_box">
              <img src="/img/qr.png" alt="" />
            </div>
            <div className="txt_box">
              <h6>
                패션 & 스타일 앱에서
                <br />
                트렌디한 패션 정보를 확인해보세요.
              </h6>
              <p>QR코드 스캔으로 더 쉽고 빠르게!</p>
              <button className="close_btn" onClick={close}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
