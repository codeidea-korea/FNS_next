import React, {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import {useNavigate, useParams} from "react-router-dom";
import Metatag from "../../components/Metatag";
import {clearMetaText} from '../../common/CommonUtils';

const TagDetail = () => {
    const navigate = useNavigate();
    const {key} = useParams();

    const [lastScroll, setLastScroll] = useState(0);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const [frameComponents, setFrameComponents] = useState([]);
    const [tagId, setTagId] = useState("");
    const [data, setData] = useState({});
    const [data02, setData02] = useState([]); // 최하단 포스트 영역 전용
    const [metaDesc, setMetaDesc] = useState('');

    useEffect(() => {
        if (key === null || key === undefined || (typeof key === 'string' && key.trim() === '')) {
            goMain();

        } else {
            AxiosInstance.get(`/api/v1/ui/view/tag_preview_name/${key}`).then((res) => {
                const arrFrameComponents = [];
                const contents = res.data.data;
                setData(contents);

                if (contents && contents.vw_groups?.length > 0) {
                    const userAccount = (contents.vw_desc === '태그상세-셀럽' && contents.vw_user_account?.length > 0) ? contents.vw_user_account[0] : '';

                    // 태그 고유의 key값 추출
                    setTagId(contents.vw_groups[0]?.grp_items[0]?.itm_data[0]?.tag_id ?? '');

                    contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {
                        vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
                            /*
                            * vwGroup.grp_id 값이 '22', '23', '24'인 경우에만 아래 로직을 적용
                            * post_images.post_image_user_tags[0]의 값이 contents.vw_user_account[0]랑 같은 이미지만 추출
                            * */
                            if (userAccount && ['22', '23', '24'].some(id => vwGroup.grp_id.includes(id))) {
                                grpItem.itm_data.forEach((id) => {
                                    const filteredImages = id.post_images.filter(postImage => postImage?.post_image_user_tags[0] === userAccount);

                                    if (filteredImages.length > 0) {
                                        id.post_images = filteredImages;
                                    }
                                });
                            }

                            const frmId = grpItem.itm_frm_id; // 프레임 id

                            if (grpItem.itm_data.length > 0) {
                                const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                                if (DynamicFrameComponent) {
                                    arrFrameComponents.push(
                                        <DynamicFrameComponent
                                            key={`component_${vwGroupIdx}_${grpItemIdx}`}
                                            grpItem={grpItem}
                                            openAppDownModalFn={openAppDownModal}
                                        />
                                    );
                                }
                            }
                        });
                    });
                }

                setFrameComponents(arrFrameComponents);

            }).catch(() => {
                goMain();
            });
        }
    }, [key]);

    useEffect(() => {
        // 태그 상세 - 최하단 포스트 영역
        if (tagId !== '') {
            AxiosInstance.get(`/api/v1/tag/posts/${tagId}`).then((res) => {
                setData02(res.data.data);
            });
        }
    }, [tagId]);

    /* meta의 desc 값 만들기 */
    useEffect(() => {
        if (data && data.vw_groups?.length > 0) {
            const top5Data = data.vw_groups[1].grp_items[0].itm_data;

            /* desc = Top 5 에 있는 5개 포스트의 캡션들 총합 */
            let tempMetaDesc = '';

            top5Data.map((topData) => {
                tempMetaDesc = tempMetaDesc + topData.post_desc?.split('\n')[0] + ' ';
            });

            setMetaDesc(clearMetaText(tempMetaDesc));
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle)
        }
    }, [lastScroll]);

    /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
    useEffect(() => {
        const handleScroll = () => {
            const restrictedElement = document.querySelector('.main.section_box section');

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

    const goMain = () => {
        navigate('home/10001');
    }

    const scrollHandle = () => {
        const top = document.querySelector('.detail_top')

        // 스크롤시 이미지 상단고정
        const topImg = top.querySelector('.topic_thumbnail img')

        if (window.scrollY > top.offsetTop + (window.scrollY * 0.3)) {
            topImg.style.top = (window.scrollY - top.offsetTop - (window.scrollY * 0.3)) + "px";

        } else {
            topImg.style.top = "0px"
        }

        // 스크롤시 이전 버튼 같이 따라다니기
        const currentScrollY = window.scrollY;
        const prevBtn = top.querySelector('.btn_wrap')
        const scrollTit = document.querySelector('.scroll_tit')

        if (lastScroll < currentScrollY) {
            prevBtn.classList.remove('on')
            scrollTit.classList.remove('on')

        } else {
            prevBtn.classList.add('on')
            scrollTit.classList.add('on')
        }

        setLastScroll(currentScrollY)

        // 스크롤시 메뉴 보이기
        if (window.scrollY > (top.offsetTop + top.clientHeight)) {
            scrollTit.classList.add('active')

        } else {
            scrollTit.classList.remove('active')
        }
    }

    return (
        <>
            {
                (data && frameComponents && frameComponents.length > 0) && (
                    <>
                        <Metatag
                            title={key + ' | 패션앤스타일 (Fashion & Style)' ?? ''}
                            desc={metaDesc ?? ''}
                            image={data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url_def ?? data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1}
                            date={data?.created_at ?? ''}
                        />

                        <div className="detail_top people_detail">
                            <div className="btn_wrap"></div>

                            <section className={'visual_type'}>
                                <div className={`topic_thumbnail`}>
                                    <a style={{cursor: "pointer"}} onClick={openAppDownModal}>
                                        <img src={data.vw_image_url} alt={data.vw_title + " 이미지"}/>
                                        <div className="txt_box">
                                            <h5 dangerouslySetInnerHTML={{__html: data.vw_title}}></h5>
                                        </div>
                                    </a>
                                </div>
                            </section>

                            {/* 팔로잉 시 클래스 following 추가 */}
                            {/*<button className="follow_btn" onClick={openAppDownModal}>팔로우</button>*/}
                        </div>

                        {/* 스크롤시 메뉴 */}
                        <div className='scroll_tit'>
                            {/*<button onClick={() => navigate(-1)} className='prev_btn'>
                                <img src="/img/prev_arrow.svg" alt="이전페이지로 이동"/>
                            </button>*/}
                            <h3>{data.vw_title}</h3>
                            {/* 팔로잉 시 클래스 following 추가 */}
                            {/*<button className="follow_btn" onClick={openAppDownModal}>팔로우</button>*/}
                        </div>

                        <div className="main section_box">
                            {/* 프레임별 컴포넌트들 조합 */}
                            {frameComponents}

                            {
                                // 태그 상세 - 최하단 포스트 영역
                                (data02 && data02.length > 0) && (
                                    <section className={`topic_list same_type`}>
                                        <h3 className="main_tit">포스트</h3>
                                        <ul>
                                            {data02.map((item, index) => (
                                                <li key={index}>
                                                    <a style={{cursor: "pointer"}} onClick={openAppDownModal}>
                                                        <div className="img_box">
                                                            <img src={item.post_images[0].post_image_url} alt={item.post_desc.replace(/\n/g,
                                                                <br/>) + " 이미지"}/>
                                                        </div>
                                                        <div className="txt_box">
                                                            <div className="name">{item.post_desc.split('\n')[0]}</div>
                                                            <p className="cate">{item.post_tags[0].tag_name}</p>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default TagDetail;