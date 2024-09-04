import React, {useEffect, useRef, useState} from "react";
import {closeAppDownModal, openAppDownModal} from '../../common/AppDownModalUtil';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";
import Post from "../../components/common/Post";
import RecommendTopics from "../../components/common/RecommendTopics";

const Foryou = () => {
    const [posts01, setPosts01] = useState([]);
    const [posts02, setPosts02] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        AxiosInstance.get('/api/v2/latest').then((res1) => {
            setPosts01(res1.data.data.post.slice(0, 2));
            setPosts02(res1.data.data.post.slice(2, 6));
        });

        AxiosInstance.get('/api/v1/latest_topic').then((res2) => {
            setTopics(res2.data.data.topic.slice(0, 4));
        });
    }, []);

    /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
    const [isAlertShown, setIsAlertShown] = useState(false);

    useEffect(() => {
        const handleScroll = (event) => {
            const restrictedElement = document.querySelector('section.topic_list.same_type.type02');

            if (restrictedElement) {
                const sectionBottom = restrictedElement.getBoundingClientRect().bottom + window.scrollY + 110;
                const currentScroll = window.scrollY + window.innerHeight - (window.visualViewport ? window.visualViewport.height - window.innerHeight : 0);

                if (currentScroll > sectionBottom + 50) {
                    event.preventDefault();
                    window.scrollTo(0, sectionBottom - window.innerHeight);

                    openAppDownModal();
                    setIsAlertShown(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAlertShown]);

    return (
        <>
            <Metatag
                title={'추천 | 패션앤스타일 (Fashion & Style)'}
                desc={'추천 | 감각적인 에디터와 개발자들이 트렌디한 패션 뉴스와 빅데이터, AI 기술을 활용해 유익한 패션 정보를 제공합니다.'}
                image={''}
            />

            <div className="recommend">
                {
                    (posts01.length > 0 && topics.length > 0 && posts02.length > 0) && (
                        <>
                            {posts01.map((posts01Item, posts01Idx) => (
                                <Post key={posts01Idx} openAppDownModalFn={openAppDownModal} post={posts01Item} showComment={false}/>
                            ))}

                            <RecommendTopics key={'recommendTopics-key'} openAppDownModalFn={openAppDownModal} topics={topics}/>

                            {posts02.map((posts02Item, posts02Idx) => (
                                <Post key={posts02Idx} openAppDownModalFn={openAppDownModal} post={posts02Item} showComment={false}/>
                            ))}
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Foryou;