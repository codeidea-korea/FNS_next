"use client";
import React from "react";
import { clickUseApp } from "../../common/CommonUtils.jsx";
import { isMobileFn, openAppDownModal } from "../../common/AppDownModalUtil";

const Mypage = () => {
  /* 앱으로 보기 버튼 클릭 */
  const clickUseAppBtn = () => {
    if (isMobileFn()) {
      clickUseApp();
    } else {
      openAppDownModal();
    }
  };

  return (
    <>
      <div className="mypage">
        <section className="mypage_con01">
          <div className="txt_box">
            트렌디한 <br />
            디지털 패션 미디어
            <br />
            <img src="/img/full_logo.svg" alt="Fashion&Style" />
          </div>

          <div className="mock_img">
            <img src="/img/main01_img01.png" alt="" />
            <a
              onClick={clickUseAppBtn}
              style={{ cursor: "pointer" }}
              className="down_btn"
            >
              App Download
            </a>
          </div>

          <div className="bottom_txt">
            최신 패션 아이템, 셀럽 스타일링, <br />
            <b>트렌드를 한 곳에서</b> 만나보세요. <br />
            손안에서 만나는 패션 소식, <br />
            패션이 쉬워집니다.
          </div>
        </section>
      </div>
    </>
  );
};

export default Mypage;
