import TopicThumbnail from "@/components/TopicThumbnail";
import PostThumbnail from "@/components/PostThumbnail";
import React, {useEffect, useState} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles

const Detail = ()=>{
    const bestData = [
        { src:"/img/thumbnail/post_1.png", title:"20대라 해도 믿을 한예슬 근황❤️‍🔥", category:"이연희" },
        { src:"/img/thumbnail/post_2.png", title:"와이드로 편하게🤍 @화이트팬츠", category:"화이트팬츠" },
        { src:"/img/thumbnail/post_3.png", title:"영롱한 셀린느 트리옹프 목걸이✨", category:"셀린느" },
        { src:"/img/thumbnail/post_4.png", title:"힙한 신혼여행 코디🏖️🇹🇭 김보라", category:"김보라" },
        { src:"/img/thumbnail/post_5.png", title:"미모 열일 중인 수지 너무 청순해🖤", category:"수지" },
    ];

    const [lastScroll, setLastScroll] = useState(0);

    useEffect(()=>{
        window.addEventListener('scroll',scrollHandle);
        return ()=>{window.removeEventListener('scroll',scrollHandle)}
    },[lastScroll])


    const scrollHandle = ()=>{
        const top = document.querySelector('.detail_top')

        // 스크롤시 이미지 상단고정
        const topImg = top.querySelector('.topic_thumbnail img')
        if(window.scrollY > top.offsetTop + (window.scrollY * 0.3)){
            topImg.style.top = (window.scrollY - top.offsetTop - (window.scrollY * 0.3)) + "px";
            // (window.scrollY * 0.3)
        }else{
            topImg.style.top = "0px"
        }

        // 스크롤시 이전 버튼 같이 따라다니기
        const currentScrollY = window.scrollY;
        const prevBtn = top.querySelector('.btn_wrap')
        const btCategory = document.querySelector('.bottom_category')

        if (lastScroll < currentScrollY) {
            prevBtn.classList.remove('on')
            btCategory.classList.remove('active')
        } else {
            prevBtn.classList.add('on')
            btCategory.classList.add('active')
        }

        setLastScroll(currentScrollY)

        // 스크롤시 카테고리 박스 보이기 & 뒤의 텍스트,아이콘 가리기
        if(window.scrollY > (top.offsetTop + top.clientHeight - (btCategory.clientHeight * 2.5))){
            btCategory.classList.add('on')
            prevBtn.classList.add('off')
            top.classList.add('off')
        }else{
            btCategory.classList.remove('on')
            prevBtn.classList.remove('off')
            top.classList.remove('off')
        }


        // 스크롤시 카테고리 변경
        document.querySelectorAll('.category_cont').forEach((item)=>{
            let itemTop = item.offsetTop - 130;
            let target = item.dataset.cont;

            if(window.scrollY > itemTop){
                btCategory.querySelectorAll('.swiper-slide').forEach((items)=>{items.classList.remove('active')})
                let slideTarget = btCategory.querySelector(`.swiper-slide[data-target="${target}"]`)
                slideTarget.classList.add('active')

                categoryPosition(slideTarget);
            }
        })

    }

    // 카테고리 클릭
    const cateClick = (e) => {
        // // active 클래스 추가
        // document.querySelectorAll('.swiper-slide').forEach((item)=>{
        //     item.classList.remove('active')
        // })
        // e.currentTarget.classList.add('active')

        // 타겟 이동시키기
        categoryPosition(e.currentTarget);

        // 해당 컨텐츠로 스크롤 이동
        const target = e.currentTarget.dataset.target;
        const targetTop = document.querySelector(`.category_cont[data-cont="${target}"]`).offsetTop - 129;
        window.scrollTo({top:targetTop,behavior:'smooth'})
    }

    const categoryPosition = (target) => {
        const swiper = document.querySelector('.category_swiper')
        const swiperWrap = document.querySelector(".category_swiper .swiper-wrapper");
        const lastSwiper = swiperWrap.querySelector('.swiper-slide:last-of-type');
        const swiperSize = lastSwiper.offsetLeft + lastSwiper.clientWidth; // swiper 전체 길이

        const targetSize = target.clientWidth; // 타겟 width값
        const targetPosition = target.offsetLeft; // 타겟 left 값
        const maxSwiper = swiperSize - swiper.clientWidth; // swiper 할수있는 최대 공간

        const changePosition = (-targetPosition) + (swiper.clientWidth / 2) - (targetSize / 2); // 타겟 화면 정중앙에 놓기

        setTimeout(() => {
            // 스와이프 할 수 있을때 
            if (swiper.clientWidth < swiperSize) {
                // 포지션이 음수일때
                if (changePosition < 0) {
                    if (changePosition < (maxSwiper * -1)) {
                        // 마지막으로 고정
                        swiperWrap.style.transform = `translate3d(${(maxSwiper * -1) - 15}px, 0, 0)`;
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
    }
    
    return (
        <>
            <div className="detail_top">
                <div className="btn_wrap"><button className="prev_btn"><img src="/img/prev_arrow_w.svg" alt="이전페이지로 이동" /></button></div>
                <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} visualType={true} />
            </div>
            
            {/* 상단 카테고리 */}
            <div className="bottom_category">
                <h3>상의로 시작하는 여름 코디공식</h3>
                <div className="cate_wrap">
                    {/* button 태그변경시 클래스만 유지. */}
                    <button className="prev_btn"><img src="/img/prev_arrow.svg" alt="이전페이지로 이동" /></button>
                    <Swiper slidesPerView={'auto'} spaceBetween={12} className="category_swiper">
                        <SwiperSlide className="active" data-target="category_01" onClick={cateClick}><span>BEST 5</span></SwiperSlide>
                        <SwiperSlide onClick={cateClick} data-target="category_02"><span>아이템활용법</span></SwiperSlide>
                        <SwiperSlide onClick={cateClick} data-target="category_03"><span>브랜드필수템</span></SwiperSlide>
                        <SwiperSlide onClick={cateClick} data-target="category_04"><span>시즌코디</span></SwiperSlide>
                        <SwiperSlide onClick={cateClick} data-target="category_05"><span>아이템조합</span></SwiperSlide>
                        <SwiperSlide onClick={cateClick} data-target="category_06"><span>여행</span></SwiperSlide>
                        <SwiperSlide onClick={cateClick} data-target="category_07"><span>헤어트렌드</span></SwiperSlide>
                    </Swiper>
                </div>
            </div>
            
            <div className="category_cont" data-cont="category_01">
                <PostThumbnail rank={true} title={"BEST 5"} data={bestData} />
            </div>
            <div className="category_cont" data-cont="category_02">
                <PostThumbnail rank={true} title={"아이템활용법"} data={bestData} />
            </div>
            <div className="category_cont" data-cont="category_03">
                <PostThumbnail rank={true} title={"브랜드필수템"} data={bestData} />
            </div>
            <div className="category_cont" data-cont="category_04">
                <PostThumbnail rank={true} title={"시즌코디"} data={bestData} />
            </div>
            <div className="category_cont" data-cont="category_05">
                <PostThumbnail rank={true} title={"아이템조합"} data={bestData} />
            </div>
            <div className="category_cont" data-cont="category_06">
                <PostThumbnail rank={true} title={"여행"} data={bestData} />
            </div>
            <div className="category_cont" data-cont="category_07">
                <PostThumbnail rank={true} title={"헤어트렌드"} data={bestData} />
            </div>
        </>
    )
}

export default Detail;