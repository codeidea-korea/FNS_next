"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

export default function Landing() {
  const mc03mobTxt = ["일상룩", "셀럽룩", "키워드"];
  const mc06mobTxt = ["최근조회", "관심태그", "라이브러리"];

  useEffect(() => {
    const main04_li = document.querySelectorAll(".main_con04 .list_box li");
    const main04_i = document.querySelector(".main_con04 .img_box i");

    main04_li.forEach((item) => {
      item.addEventListener("click", main04Click);
    });
    main04_i.addEventListener("scroll", main04Scroll);

    return () => {
      main04_li.forEach((item) => {
        item.removeEventListener("click", main04Click);
      });
      main04_i.removeEventListener("scroll", main04Scroll);
    };
  });

  const main04Click = (e) => {
    const num = e.currentTarget.getAttribute("data-index");
    const imgH = document.querySelector(
      ".main_con04 .img_box i img",
    ).clientHeight;
    const sct = [
      0,
      (imgH / 4.33).toFixed(),
      (imgH / 1.832).toFixed(),
      (imgH / 1.564).toFixed(),
    ];

    document
      .querySelector(".main_con04 .img_box i")
      .scrollTo({ top: sct[num], behavior: "smooth" });
  };

  const main04Scroll = (e) => {
    const imgH = document.querySelector(
      ".main_con04 .img_box i img",
    ).clientHeight;
    const scrollT = [
      0,
      (imgH / 4.33).toFixed(),
      (imgH / 1.832).toFixed(),
      (imgH / 1.564).toFixed(),
    ];

    if (e.currentTarget.scrollTop >= scrollT[3]) {
      document.querySelector(".main_con04 .list_box").classList.remove("path1");
      document.querySelector(".main_con04 .list_box").classList.remove("path2");
      document.querySelector(".main_con04 .list_box").classList.remove("path3");
      document.querySelector(".main_con04 .list_box").classList.add("path4");
      document
        .querySelectorAll(".main_con04 .list_box li")
        .forEach((item, index) => {
          if (index === 3) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
    } else if (e.currentTarget.scrollTop >= scrollT[2]) {
      document.querySelector(".main_con04 .list_box").classList.remove("path1");
      document.querySelector(".main_con04 .list_box").classList.remove("path2");
      document.querySelector(".main_con04 .list_box").classList.remove("path4");
      document.querySelector(".main_con04 .list_box").classList.add("path3");
      document
        .querySelectorAll(".main_con04 .list_box li")
        .forEach((item, index) => {
          if (index === 2) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
    } else if (e.currentTarget.scrollTop >= scrollT[1]) {
      document.querySelector(".main_con04 .list_box").classList.remove("path1");
      document.querySelector(".main_con04 .list_box").classList.remove("path3");
      document.querySelector(".main_con04 .list_box").classList.remove("path4");
      document.querySelector(".main_con04 .list_box").classList.add("path2");
      document
        .querySelectorAll(".main_con04 .list_box li")
        .forEach((item, index) => {
          if (index === 1) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
    } else {
      document.querySelector(".main_con04 .list_box").classList.remove("path2");
      document.querySelector(".main_con04 .list_box").classList.remove("path3");
      document.querySelector(".main_con04 .list_box").classList.remove("path4");
      document.querySelector(".main_con04 .list_box").classList.add("path1");
      document
        .querySelectorAll(".main_con04 .list_box li")
        .forEach((item, index) => {
          if (index === 0) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
    }
  };

  return (
    <>
      <section className="main_con01">
        <div className="inner">
          <div>
            <div className="txt_box">
              트렌디한 <br />
              디지털 패션 미디어
              <br />
              <img src="/img/landing/full_logo.svg" alt="Fashion&Style" />
              <a
                href="https://fashionandstyle.app.link/tRmnVZvYFLb"
                target="_blank"
                className="down_btn"
              >
                App Download
              </a>
            </div>
            <div className="mock_img">
              <img src="/img/landing/main01_img01.png" alt="" />
              <a
                href="https://fashionandstyle.app.link/tRmnVZvYFLb"
                target="_blank"
                className="down_btn"
              >
                App Download
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="main_con02">
        <div className="inner">
          <div className="bottom_txt">
            최신 패션 아이템, 셀럽 스타일링, <br />
            <b>트렌드를 한 곳에서</b> 만나보세요. <br />
            손안에서 만나는 패션 소식, <br />
            패션이 쉬워집니다.
          </div>
        </div>
        <img className="pc_ver" src="/img/landing/main02_img01.png" alt="" />
        <img className="mo_ver" src="/img/landing/main02_img01_mo.png" alt="" />
      </section>

      <section className="main_con03 pc_only" data-active="1">
        <div className="inner">
          <div className="tit_box">
            <h3>
              실시간으로 만나는
              <br />
              <b>패션 트렌드</b>
            </h3>
            <p>
              매일매일 업로드되는 최신 트렌드 패션 아이템과
              <br />
              다양한 셀럽들의 스타일링.
              <br />
              오늘 뭐 입을지 고민은 저희가 종결시켜 드릴게요.
            </p>
            <span>화살표를 눌러 다른 화면을 이용해보세요.</span>
          </div>
          <div className="slide_box">
            <span className="navigation prev">
              <img src="/img/landing/slide_prev_btn.svg" alt="" />
            </span>
            <span className="navigation next">
              <img src="/img/landing/slide_next_btn.svg" alt="" />
            </span>
            <div className="center_box">
              <img src="/img/landing/iOS_Mock.png" alt="" />
              <Swiper
                className="center_slide"
                loop={false}
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                pagination={{
                  el: ".main_con03.pc_only .pager",
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className}"><b>${mc03mobTxt[index]}</b></span>`,
                }}
                navigation={{
                  nextEl: ".main_con03.pc_only .next",
                  prevEl: ".main_con03.pc_only .prev",
                }}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                  swiper.slideTo(1);
                }}
                onSlideChange={(swiper) => {
                  var activeIndex = swiper.activeIndex;
                  document
                    .querySelector(".main_con03")
                    .setAttribute("data-active", activeIndex);
                }}
              >
                <SwiperSlide>
                  <img src="/img/landing/main03_img01.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main03_img02.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main03_img03.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="back_slide">
              <Swiper
                slidesPerView={3}
                spaceBetween={100}
                centeredSlides={true}
                pagination={{
                  el: ".main_con03.pc_only .pager",
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className}"><b>${mc03mobTxt[index]}</b></span>`,
                }}
                navigation={{
                  nextEl: ".main_con03.pc_only .next",
                  prevEl: ".main_con03.pc_only .prev",
                }}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                  swiper.slideTo(1);
                }}
              >
                <SwiperSlide>
                  <img src="/img/landing/main03_img01.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main03_img02.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main03_img03.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="pagerContainer">
            <div className="pager"></div>
          </div>
        </div>
      </section>

      <section className="main_con03_mobile mobile_only" data-active="1">
        <div className="inner">
          <div className="tit_box">
            <h3>
              실시간으로 만나는
              <br />
              <b>패션 트렌드</b>
            </h3>
            <p>
              매일매일 업로드되는 최신 트렌드 패션 아이템과
              <br />
              다양한 셀럽들의 스타일링.
              <br />
              오늘 뭐 입을지 고민은 저희가 종결시켜 드릴게요.
            </p>
            <span>화살표를 눌러 다른 화면을 이용해보세요.</span>
          </div>
          <div className="slide_box">
            <span className="navigation prev">
              <img src="/img/landing/slide_prev_btn.svg" alt="" />
            </span>
            <span className="navigation next">
              <img src="/img/landing/slide_next_btn.svg" alt="" />
            </span>
            <div className="center_box">
              <img src="/img/landing/iOS_Mock.png" alt="" />
              <Swiper
                className="center_slide"
                loop={false}
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                pagination={{
                  el: ".main_con03_mobile .pager",
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className}"><b>${mc03mobTxt[index]}</b></span>`,
                }}
                navigation={{
                  nextEl: ".main_con03_mobile .next",
                  prevEl: ".main_con03_mobile .prev",
                }}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                  swiper.slideTo(1);
                }}
                onSlideChange={(swiper) => {
                  var activeIndex = swiper.activeIndex;
                  document
                    .querySelector(".main_con03_mobile")
                    .setAttribute("data-active", activeIndex);
                }}
              >
                <SwiperSlide>
                  <img src="/img/landing/main03_img01.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main03_img02.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main03_img03.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="pager"></div>
        </div>
      </section>

      <section className="main_con04">
        <div className="inner">
          <div className="tit_box">
            <h3>
              관심있는 키워드는
              <br />
              <b>더 자세히</b>
            </h3>
            <p>
              같은 아이템과 주제로 모아보는 패션 정보와 코디 팁<br />
              마음에 드는 패션 키워드가 있나요?
              <br />
              비슷한 정보를 모아드려요.
            </p>
          </div>
          <div className="animate_box">
            <div className="img_box">
              <img
                className="mock_img"
                src="/img/landing/iOS_Mock.png"
                alt=""
              />
              <i>
                <img src="/img/landing/main04_img.png" alt="" />
              </i>
            </div>
            <ul className="list_box">
              <li className="active" data-index="0">
                <span>키워드 팔로우</span>
              </li>
              <li data-index="1">
                <span>인기 TOP 5</span>
              </li>
              <li data-index="2">
                <span>연관 토픽</span>
              </li>
              <li data-index="3">
                <span>연관 브랜드</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="main_con05">
        <div className="inner">
          <div className="tit_box">
            <h3>
              궁금한 검색어는
              <br />
              <b>쉽고 빠르게</b>
            </h3>
            <p>
              원하는 정보만 쏙쏙 골라 전달하는
              <br />
              패션 특화 맞춤형 검색 탭<br />
              찾고 싶은 브랜드와 아이템은 바로 검색해 보세요.
            </p>
          </div>
          <div className="video_box">
            <video
              autoPlay="autoplay"
              loop="loop"
              data-autoplay=""
              muted="muted"
              playsInline
            >
              <source src="/video/fns_web-1-5_mob-pc.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="main_con06 pc_only" data-active="1">
        <div className="inner">
          <div className="tit_box">
            <h3>
              나만의 스타일 <b>모아보기</b>
            </h3>
            <p>
              원하는 정보만 쏙쏙 골라 전달하는
              <br />
              패션 특화 맞춤형 검색 탭<br />
              찾고 싶은 브랜드와 아이템은 바로 검색해 보세요.
            </p>
            <span>화살표를 눌러 다른 화면을 이용해보세요.</span>
          </div>
          <span className="summary">
            화살표를 눌러 다른 화면을 이용해보세요.
          </span>
          <div className="slide_box">
            <span className="navigation prev">
              <img src="/img/landing/slide_prev_btn.svg" alt="" />
            </span>
            <span className="navigation next">
              <img src="/img/landing/slide_next_btn.svg" alt="" />
            </span>
            <div className="center_box">
              <img src="/img/landing/iOS_Mock.png" alt="" />
              <Swiper
                className="center_slide"
                loop={false}
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                pagination={{
                  el: ".main_con06.pc_only .pager",
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className}"><b>${mc06mobTxt[index]}</b></span>`,
                }}
                navigation={{
                  nextEl: ".main_con06.pc_only .next",
                  prevEl: ".main_con06.pc_only .prev",
                }}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                  swiper.slideTo(1);
                }}
                onSlideChange={(swiper) => {
                  var activeIndex = swiper.activeIndex;
                  document
                    .querySelector(".main_con06")
                    .setAttribute("data-active", activeIndex);
                }}
              >
                <SwiperSlide>
                  <img src="/img/landing/main06_img01.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main06_img02.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main06_img03.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="back_slide">
              <Swiper
                slidesPerView={3}
                spaceBetween={100}
                centeredSlides={true}
                pagination={{
                  el: ".main_con06.pc_only .pager",
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className}"><b>${mc06mobTxt[index]}</b></span>`,
                }}
                navigation={{
                  nextEl: ".main_con06.pc_only .next",
                  prevEl: ".main_con06.pc_only .prev",
                }}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                  swiper.slideTo(1);
                }}
              >
                <SwiperSlide>
                  <img src="/img/landing/main06_img01.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main06_img02.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main06_img03.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="pagerContainer">
            <div className="pager"></div>
          </div>
        </div>
      </section>

      <section className="main_con06_mobile mobile_only" data-active="1">
        <div className="inner">
          <div className="tit_box">
            <h3>
              나만의 스타일 <b>모아보기</b>
            </h3>
            <p>
              원하는 정보만 쏙쏙 골라 전달하는
              <br />
              패션 특화 맞춤형 검색 탭<br />
              찾고 싶은 브랜드와 아이템은 바로 검색해 보세요.
            </p>
            <span>화살표를 눌러 다른 화면을 이용해보세요.</span>
          </div>
          <span className="summary">
            화살표를 눌러 다른 화면을 이용해보세요.
          </span>
          <div className="slide_box">
            <span className="navigation prev">
              <img src="/img/landing/slide_prev_btn.svg" alt="" />
            </span>
            <span className="navigation next">
              <img src="/img/landing/slide_next_btn.svg" alt="" />
            </span>
            <div className="center_box">
              <img src="/img/landing/iOS_Mock.png" alt="" />
              <Swiper
                className="center_slide"
                loop={false}
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                pagination={{
                  el: ".main_con06_mobile .pager",
                  clickable: true,
                  renderBullet: (index, className) =>
                    `<span class="${className}"><b>${mc06mobTxt[index]}</b></span>`,
                }}
                navigation={{
                  nextEl: ".main_con06_mobile .next",
                  prevEl: ".main_con06_mobile .prev",
                }}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                  swiper.slideTo(1);
                }}
                onSlideChange={(swiper) => {
                  var activeIndex = swiper.activeIndex;
                  document
                    .querySelector(".main_con06_mobile")
                    .setAttribute("data-active", activeIndex);
                }}
              >
                <SwiperSlide>
                  <img src="/img/landing/main06_img01.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main06_img02.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/img/landing/main06_img03.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="pager"></div>
        </div>
      </section>

      <section className="main_con07">
        <div className="inner">
          <div className="mo_ver">
            <p>지금 시작해보세요</p>
            <a
              href="https://fashionandstyle.app.link/tRmnVZvYFLb"
              target="_blank"
              className="down_btn"
            >
              App Download
            </a>
          </div>
          <div className="mock_img">
            <img src="/img/landing/main01_img01.png" alt="" />
            <p>지금 시작해보세요</p>
            <a
              href="https://fashionandstyle.app.link/tRmnVZvYFLb"
              target="_blank"
              className="down_btn"
            >
              App Download
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
