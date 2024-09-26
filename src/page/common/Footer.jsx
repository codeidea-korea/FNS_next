import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="inner">
        <div className="fnb">
          <div className="left_box">
            <img src="/img/landing/full_logo.svg" width="144" alt="" />
            <div className="sns_link">
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
              <a
                href="https://www.facebook.com/fashionstylepage"
                target="_blank"
              >
                <img
                  src="/img/landing/sns_face.png"
                  width="24"
                  alt="페이스북"
                />
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
          </div>
          <div className="right_link">
            <Link href="/about">회사소개</Link>
            <Link href="/app">서비스 및 채널 소개</Link>
            <Link href="/service">이용약관</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/protection">청소년 보호정책(책임자: 윤정원)</Link>
          </div>
        </div>
        <div className="address">
          <p>패션앤스타일컴퍼니 주식회사</p>
          <ul>
            <li>
              <p>
                <span>대표자</span>
                <span>윤정원</span>
              </p>
              <p>
                <span>주소</span>
                <span>서울 종로구 종로3길 24-20 5층 501호</span>
              </p>
              <p>
                <span>사업자등록번호</span>
                <span>638-81-02307</span>
              </p>
            </li>
            <li>
              <p>
                <span>고객센터</span>
                <span>
                  support@fashionandstyle.com
                  <br />
                  1533-6248
                </span>
              </p>
            </li>
            <li>
              <p>
                <span>인터넷신문등록번호</span>
                <span>서울 아54253</span>
              </p>
              <p>
                <span>등록일자</span>
                <span>2022년 5월 4일</span>
              </p>
              <p>
                <span>발행인·편집인</span>
                <span>윤정원</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
