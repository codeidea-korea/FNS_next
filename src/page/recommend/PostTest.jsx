import React, {useEffect, useState} from 'react';
import PostThumbnail from "@/components/PostThumbnail";
import TopicThumbnail from "@/components/TopicThumbnail"
import PostThumbnailSlide from '@/components/PostThumbnailSlide';
import PostFrame from '@/components/PostFrameTest';
import Metatag from "@/components/Metatag";
import {Link, useLocation} from 'react-router-dom';
import AxiosInstance from "@/common/AxiosInstance";
import {SwiperSlide} from "swiper/react";


const Post = ()=>{
    const url = useLocation().pathname;
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // gnb 메뉴 조회
        const getPost = async () => {
            const match = url.match(/\/([^\/]+)$/);
            const postId = match ? match[1] : null;

            try {
                const result = await AxiosInstance.get(`/api/v1/post/preview/${postId}`);
                setPost(result.data.data);

            } catch (error) {
                setError(error.message);
            }
        };

        getPost();
    }, []);

    const data = {
        img:["/img/recommend/feed03_1.jpg","/img/recommend/feed03_2.jpg","/img/recommend/feed03_3.jpg","/img/recommend/feed03_4.jpg"],
        img_id:["calvinklein"],
        tag:["뉴진스","콜라보","캘빈클라인"],
        like:0,
        category:"셀럽 이슈",
        desc:"청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
    }; 

    const bestData = [
        { src:"/img/thumbnail/post_1.png", title:"폭풍성장한 대한민국만세🐥🩵", category:"문화" },
        { src:"/img/thumbnail/post_2.png", title:"미모 열일 중인 수지 너무 칭찬해🖤", category:"수지" },
        { src:"/img/thumbnail/post_3.png", title:"대세 드라마 결혼식의 공통점👰🏻‍♀️🤵🏻‍♂️", category:"웨딩" },
        { src:"/img/thumbnail/post_4.png", title:"여행룩으로 활용가능✈️려원 코디", category:"려원" },
        { src:"/img/thumbnail/post_5.png", title:"하니👰🏻‍♀️ 9월의 신부되나💍", category:"하니" },
    ];

    const newjeansData = [
        { src:"/img/thumbnail/asso_1.jpg", title:"여름이니까 크로셰모자🤍✨", category:"모자" },
        { src:"/img/thumbnail/asso_2.jpg", title:"캠퍼스를 입은 셀럽들의 축제 스타일링💙", category:"파티룩" },
        { src:"/img/thumbnail/asso_3.jpg", title:"여름 코르테즈는 화이트🤍👟", category:"웨딩" },
        { src:"/img/thumbnail/asso_4.jpg", title:"뉴진스 x 무라카미 다카시🌼 🪻 팬아트 출시되나요??", category:"뉴진스" },
    ];

    return (
        <>
            <div className="recommend">
                {post && (
                    <PostFrame data={post && post} descOpen={true} />
                )}

                <div className="gray_type">
                    <PostThumbnail rank={false} associated={true} same_type={true} data={newjeansData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />
                    <PostThumbnail rank={false} associated={true} same_type={true} data={newjeansData} profileName={"콜라보"} profileUrl={"/img/thumbnail/asso_4.jpg"} />

                    <PostThumbnailSlide title={"미니멀한 셀럽 이슈"} data={newjeansData} />

                    <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"라이프스타일트렌..."} desc={"하니, 뉴진스, 2NE1 로..."} bigTitle={"연관 토픽"} />

                    <PostThumbnail rank={false} title={"연관 포스트"} data={bestData} />
                </div>

            </div>
        </>
    )
}
export default Post;