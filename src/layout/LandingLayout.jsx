import React, { useEffect, useState } from 'react';
import {Link, Outlet} from 'react-router-dom';

import GlobalAppDownModal from "../common/AppDownModalUtil";
import {openAppDownModal,isMobileFn} from '../common/AppDownModalUtil';
import {clickUseApp} from "../common/CommonUtils";

import "../assets/css/landing.css"

const LandingLayout = ()=>{
    const [scT,setScT] = useState(window.scrollY);

    useEffect(() => {
        document.body.style.width = '100%';
        document.body.style.backgroundColor = '#fff';
        return () =>{
            document.body.style.width = '600px';
            document.body.style.backgroundColor = '#FAFAFA';
        }
    },[]);

    // 헤더에 Fixed 클래스 추가
    const bodyScroll = ()=>{
        if(scT > 0){
            document.querySelector('header').classList.add('fixed')
            return ()=>{
                document.querySelector('header').classList.remove('fixed')
            }
        }
        setScT(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", bodyScroll)
        return () => {
            window.removeEventListener("scroll", bodyScroll)
        }
    }, [scT]);


    // 모바일 햄버거버튼
    const moHamToggle = ()=>{
        let moMenu = document.querySelector('.mobile_menu');
        if(moMenu.classList.contains('open')){
            moMenu.classList.remove('open');
            document.body.style.overflow = "unset";
        }else{
            moMenu.classList.add('open');
            document.body.style.overflow = "hidden";
        }
    }

    useEffect(() => {
        document.querySelectorAll('.ham_icon').forEach((item)=>{
            item.addEventListener("click", moHamToggle)
        })
        return () => {
            document.querySelectorAll('.ham_icon').forEach((item)=>{
                item.removeEventListener("click", moHamToggle)
            })
        }
    }, []);

    // 모바일 메뉴 
    function slideToggle(element, duration = 400) {
        const isHidden = window.getComputedStyle(element).display === 'none';
    
        if (isHidden) {
            element.style.display = 'block';
            const height = element.scrollHeight;
            element.style.height = '0px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease`;
            setTimeout(() => {
                element.style.height = `${height}px`;
            }, 10);
        } else {
            element.style.height = `${element.scrollHeight}px`;
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease`;
            setTimeout(() => {
                element.style.height = '0px';
            }, 10);
        }
    
        element.addEventListener('transitionend', function handler() {
            if (!isHidden) element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
            element.removeEventListener('transitionend', handler);
        });
    }

    const moMenuToggle = (item)=>{
        if(item.currentTarget.classList.contains('on')){
            item.currentTarget.classList.remove('on')
            slideToggle(item.currentTarget.nextElementSibling,400)
        }else{
            item.currentTarget.classList.add('on')
            slideToggle(item.currentTarget.nextElementSibling,400)
        }
    }

    /* 앱으로 보기 버튼 클릭 */
    const clickUseAppBtn = () => {
        if(isMobileFn()) {
            clickUseApp();
        }else {
            openAppDownModal();
        }
    }


    return (
        <>
            <div id="wrap">
                <div id="landing">
                    <header>
                        <div className="inner">
                            <h1><a href="/"><img src="./img/landing/logo.svg" alt="logo" /></a></h1>
                            <div className="right_box">
                                {/* <a className="about_link" href="./aboutus.html">회사소개</a> */}
                                <a className="down_btn" href="#" onClick={clickUseAppBtn}>앱 다운로드</a>
                                <a className="ham_icon" href="#"><img src="./img/landing/ham_icon.svg" alt="" /></a>
                            </div>
                        </div>
                    </header>

                    <div className="mobile_menu">
                        <div className="top_box">
                            <a className="ham_icon" href="#"><img src="./img/landing/ham_icon_white.svg" alt=""/></a>
                        </div>
                        <a className="down_btn" href="#" onClick={clickUseAppBtn}>앱 다운로드 <img src="./img/landing/right_arrow.svg" alt=""/></a>
                        <div className="menu_box">
                            <h4>운영 채널</h4>
                            <ul>
                                <li>
                                    <a href="#" onClick={moMenuToggle}>인스타그램 <img src="./img/landing/down_arrow.svg" alt=""/></a>
                                    <ul>
                                        <li><a href="https://www.instagram.com/fashionandstyle.official/" target="_blank">@fashionandstyle.official</a></li>
                                        <li><a href="https://www.instagram.com/streetwearnow.official/" target="_blank">@streetwearnow.official</a></li>
                                        <li><a href="https://www.instagram.com/women.streetwear/" target="_blank">@women.streetwear</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/fashionstylepage" target="_blank">페이스북</a>
                                </li>
                                <li>
                                    <a href="#" onClick={moMenuToggle}>카카오 <img src="./img/landing/down_arrow.svg" alt=""/></a>
                                    <ul>
                                        <li><a href="http://pf.kakao.com/_vfdPl" target="_blank">카카오채널</a></li>
                                        <li><a href="https://story.kakao.com/ch/fashionstyle" target="_blank">카카오스토리</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" onClick={moMenuToggle}>스레드 <img src="./img/landing/down_arrow.svg" alt=""/></a>
                                    <ul>
                                        <li><a href="https://www.threads.net/@fashionandstyle.official" target="_blank">@fashionandstyle.official</a></li>
                                        <li><a href="https://www.threads.net/@streetwearnow.official/" target="_blank">@streetwearnow.official</a></li>
                                        <li><a href="https://www.threads.net/@women.streetwear" target="_blank">@women.streetwear</a></li>
                                    </ul>
                                </li>
                            </ul>
                            {/* <div className="devider"></div>
                            <h4>비즈니스</h4>
                            <ul>
                                <li>
                                    <a href="./aboutus.html">회사소개</a>
                                </li>
                            </ul> */}
                        </div>
                    </div>

                    <div className="content">
                        <Outlet/>
                    </div>

                    <footer>
                        <div className="inner">
                            <div className="fnb">
                                <div className="left_box">
                                    <img src="./img/landing/full_logo.svg" width="144" alt="" />
                                    <div className="sns_link">
                                        <a href="https://www.instagram.com/fashionandstyle.official/" target="_blank"><img src="./img/landing/sns_insta.png" width="24" alt="인스타그램" /></a>
                                        <a href="https://www.facebook.com/fashionstylepage" target="_blank"><img src="./img/landing/sns_face.png" width="24" alt="페이스북" /></a>
                                        <a href="https://story.kakao.com/ch/fashionstyle" target="_blank"><img src="./img/landing/sns_link.png" width="24" alt="카카오스토리" /></a>
                                        <a href="http://pf.kakao.com/_vfdPl" target="_blank"><img src="./img/landing/sns_kakao.png" width="24" alt="카카오톡채널" /></a>
                                        <a href="https://www.threads.net/@fashionandstyle.official" target="_blank"><img src="./img/landing/sns_email.png" width="24" alt="스레드" /></a>
                                    </div>
                                </div>
                                <div className="right_link">
                                    <Link to="/service">이용약관</Link>
                                    <Link to="/privacy">개인정보처리방침</Link>
                                    <Link to="/protection">청소년 보호정책(책임자: 윤정원)</Link>
                                    {/* <a href="./aboutus.html">회사소개</a> */}
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
                                            <span>support@fashionandstyle.com<br/>1533-6248</span>
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
                    </footer>
                </div>
            </div>
            <GlobalAppDownModal/>
        </>
    )
}
export default LandingLayout;