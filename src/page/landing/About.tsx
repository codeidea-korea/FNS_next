"use client";

import { useEffect, useRef } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import { LottieRefCurrentProps } from "lottie-react";
import LottieLogo from "@/assets/json/logo.json";
import LottieBg from "@/assets/json/about_mo.json";
import dynamic from "next/dynamic";

// Lottie 컴포넌트를 dynamic import로 불러오고 SSR을 비활성화
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function About() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("load", windowLoad);
      window.addEventListener("scroll", windowScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", windowLoad);
        window.removeEventListener("scroll", windowScroll);
      }
    };
  }, []);

  const windowLoad = () => {
    setTimeout(() => {
      document.querySelector(".about_intro")?.classList.add("bgtrans");
      document.querySelector(".about_intro")?.classList.add("off");
      document.querySelector(".scroll_more")?.classList.add("off");
      lottieRef.current?.play();
    }, 2000);
  };

  const windowScroll = () => {
    let winT = window.scrollY;
    if (winT > 0) {
      document.querySelector(".about_intro")?.classList.add("bgtrans");
      document.querySelector(".about_intro")?.classList.add("off");
      document.querySelector(".scroll_more")?.classList.add("off");
      lottieRef.current?.play();
    } else {
      document.querySelector(".scroll_more")?.classList.remove("off");
      lottieRef.current?.goToAndPlay(0, true);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.querySelector("#lottie")?.classList.add("hidden");
    }
  }, []);

  return (
      <>
        <div
            className="lottemobg_box"
            style={{ width: "100%", overflow: "hidden" }}
        >
          <Lottie
              id="lottiebgmo"
              lottieRef={lottieRef}
              animationData={LottieBg}
              loop={false}
              autoplay={false}
              className="mo_ver"
              style={{ position: "relative", width: "110%", left: "-5%" }}
          />
        </div>

        <div className="about_intro">
          <div className="scroll_more">
            스크롤하여 더보기
            <i>
              <img src="/img/landing/scroll_icon.svg" alt="" />
            </i>
          </div>
          <div className="inner">
            <div id="lottie2">
              <Lottie
                  className="lottie_logo"
                  animationData={LottieLogo}
                  loop={false}
              />
            </div>
            <p>
              감각적인 에디터와 개발자들이
              <br />
              트렌디한 패션 뉴스와
              <br className="mo_ver" /> 빅데이터, AI 기술을 활용해
              <br />
              <b>유익한 패션 정보</b>를 제공합니다.
            </p>
          </div>
        </div>

        <div className="about_layout">
          <div className="inner">
            <div className="tit_box">
              <h3>
                <b>빅데이터를 기반</b>으로
                <br /> 사용자가 원하는 정보를
                <br /> 제안합니다.
              </h3>
              <p>
                시즌별 유행하는 아이템부터 뷰티 관련 팁까지,
                <br />
                사용자 취향과 관심사를 빅데이터로 실시간 관리합니다.
                <br />
                이를 기반으로 관련성이 높은 데이터를 제공합니다.
              </p>
            </div>
            <div className="right_box video_box">
              <video autoPlay loop data-autoplay="" muted playsInline>
                <source src="/video/fns_web_2-1_mob-pc.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="about_layout">
          <div className="inner">
            <div className="tit_box">
              <h3>
                <b>AI를 활용</b>해<br /> 패션 콘텐츠를
                <br /> 선별하고 최적화합니다.
              </h3>
              <p>
                사용자가 원하는 스타일이나 브랜드에 대해 <br />
                분석하고, AI는 개인화된 아이템과 스타일링 팁을
                <br />
                추천해 콘텐츠를 맞춤화합니다.
              </p>
            </div>
            <div
                className="right_box"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
            >
              <img className="pc_ver" src="/img/landing/about_img01.png" alt="" />
              <img
                  className="mo_ver"
                  src="/img/landing/about_img01_mo.png"
                  alt=""
              />
            </div>
          </div>
        </div>

        <div className="about_layout">
          <div className="inner">
            <div className="tit_box">
              <h3>
                최적화된 콘텐츠는
                <br /> <b>에디터의 손길로</b>
                <br /> 완성됩니다.
              </h3>
              <p>
                트렌드 예측과 스타일링 가이드, 패션 아이템 예측 등<br />
                다양한 주제의 기사가 통찰력 있는 콘텐츠
                <br />
                에디터들로부터 가공되어 사용자에게 독특하고 유용한 <br />
                정보를 전달합니다.
              </p>
            </div>
            <div
                className="right_box"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
            >
              <img className="pc_ver" src="/img/landing/about_img02.png" alt="" />
              <img
                  className="mo_ver"
                  src="/img/landing/about_img02_mo.png"
                  alt=""
              />
            </div>
          </div>
        </div>

        <div className="about_service">
          <div className="inner">
            <div className="tit_box02">
              <img src="/img/landing/full_logo.svg" alt="" />
              <h3>운영서비스</h3>
              <p>
                패션 & 스타일은 패션 관련 정보들의 데이터를 수집해
                <br />
                사용자가 원하는 정보를 빠르고 정확하게 전달하는 <br />
                애플리케이션 서비스를 운영합니다.
              </p>
            </div>
            <div className="img_box">
              <p>패션 & 스타일</p>
              <div className="img">
                <img src="/img/landing/service_img01.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="about_layout02">
          <div className="inner">
            <div className="sns_box">
              <a
                  href="https://www.instagram.com/fashionandstyle.official/"
                  target="_blank"
              >
                <img
                    src="/img/landing/sns_insta.png"
                    width="24"
                    alt="인스타그램"
                />
              </a>
              <a href="https://www.facebook.com/fashionstylepage" target="_blank">
                <img src="/img/landing/sns_face.png" width="24" alt="페이스북" />
              </a>
              <a href="https://story.kakao.com/ch/fashionstyle" target="_blank">
                <img
                    src="/img/landing/sns_link.png"
                    width="24"
                    alt="카카오스토리"
                />
              </a>
              <a href="http://pf.kakao.com/_vfdPl" target="_blank">
                <img
                    src="/img/landing/sns_kakao.png"
                    width="24"
                    alt="카카오톡채널"
                />
              </a>
              <a
                  href="https://www.threads.net/@fashionandstyle.official"
                  target="_blank"
              >
                <img src="/img/landing/sns_email.png" width="24" alt="스레드" />
              </a>
            </div>
            <div className="tit_box02">
              <img src="/img/landing/full_logo.svg" alt="" />
              <h3>운영채널</h3>
              <p>
                패션 & 스타일은 다양한 소셜 미디어 채널을 통해
                <br />
                200만 명 이상의 유저들과 소통하고 있습니다.
              </p>
            </div>

            <div className="channel_box">
              <div className="tit_area">
                <h4>인스타그램</h4>
                <a
                    href="https://www.instagram.com/fashionandstyle.official/"
                    target="_blank"
                >
                  @fashionandstyle.official
                </a>
                <a
                    href="https://www.instagram.com/streetwearnow.official/"
                    target="_blank"
                >
                  @streetwearnow.official
                </a>
                <a
                    href="https://www.instagram.com/women.streetwear/"
                    target="_blank"
                >
                  @women.streetwear
                </a>
              </div>
              <div
                  className="img_box"
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
              >
                <img
                    className="pc_ver"
                    src="/img/landing/about_channel01.png"
                    alt=""
                />
                <img
                    className="mo_ver"
                    src="/img/landing/about_channel01_mo.png"
                    alt=""
                />
              </div>
            </div>

            <div className="channel_box">
              <div className="tit_area">
                <h4>페이스북</h4>
                <a
                    href="https://www.facebook.com/fashionstylepage"
                    target="_blank"
                >
                  fashionandstyle.official
                </a>
              </div>
              <div
                  className="img_box"
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
              >
                <img
                    className="pc_ver"
                    src="/img/landing/about_channel02.png"
                    alt=""
                />
                <img
                    className="mo_ver"
                    src="/img/landing/about_channel02_mo.png"
                    alt=""
                />
              </div>
            </div>

            <div className="channel_box">
              <div className="tit_area">
                <h4>카카오</h4>
                <a href="http://pf.kakao.com/_vfdPl" target="_blank">
                  카카오채널
                </a>
                <a href="https://story.kakao.com/ch/fashionstyle" target="_blank">
                  카카오스토리
                </a>
              </div>
              <div
                  className="img_box"
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
              >
                <img
                    className="pc_ver"
                    src="/img/landing/about_channel03.png"
                    alt=""
                />
                <img
                    className="mo_ver"
                    src="/img/landing/about_channel03_mo2.png"
                    alt=""
                />
              </div>
            </div>

            <div className="channel_box">
              <div className="tit_area">
                <h4>스레드</h4>
                <a
                    href="https://www.threads.net/@fashionandstyle.official"
                    target="_blank"
                >
                  @fashionandstyle.official
                </a>
                <a
                    href="https://www.threads.net/@streetwearnow.official/"
                    target="_blank"
                >
                  @streetwearnow.official
                </a>
                <a
                    href="https://www.threads.net/@women.streetwear"
                    target="_blank"
                >
                  @women.streetwear
                </a>
              </div>
              <div
                  className="img_box"
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
              >
                <img
                    className="pc_ver"
                    src="/img/landing/about_channel04.png"
                    alt=""
                />
                <img
                    className="mo_ver"
                    src="/img/landing/about_channel04_mo.png"
                    alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
