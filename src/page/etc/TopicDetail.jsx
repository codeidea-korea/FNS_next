import React, {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import {useNavigate, useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Metatag from "../../components/Metatag";
import {clearMetaText} from '../../common/CommonUtils';

const TopicDetail = () => {
    let tempIdx = 0;
    let tempIdx2 = 0;

    const navigate = useNavigate();
    const {key} = useParams();

    const [data, setData] = useState({});
    const [filters, setFilters] = useState([]);
    const [groups, setGroups] = useState([]);
    const [tagId, setTagId] = useState("");
    const [lastScroll, setLastScroll] = useState(0);
    const [metaDesc, setMetaDesc] = useState('');

    useEffect(() => {
        if (key === null || key === undefined || (typeof key === 'string' && key.trim() === '')) {
            goMain();

        } else {
            AxiosInstance.get(`/api/v1/ui/viewpage/topic_preview_name/${key}`).then((res) => {
                const contents = res.data.data;
                setData(contents);
                setTagId(contents.vw_filter_except_tags[0]);
                setFilters(contents.vw_filters);

            }).catch(() => {
                goMain();
            });
        }
    }, [key]);

    useEffect(() => {
        /*
        * tagId : ex)"설현의 모든 것" 에 대한 key값으로 예상됨
        * itm_data.post_images 배열을 보면 이미지가 한개가 아니라 여러개이다.
        * 이 배열에서 post_image_acc[0]?.post_image_acc_tag[0]?.tag_id 값이 현재 들어온 ex)"설현의 모든 것"의 key값인 tagId와 같은 데이터 한개를 골라내야된다.
        * */
        if (data && data.vw_groups?.length > 0) {
            data.vw_groups.forEach((vg) => {
                vg.grp_items.forEach((gi) => {
                    gi.itm_data.forEach((id) => {
                        const filteredImages = id.post_images.filter(pi => pi?.post_image_acc[0]?.post_image_acc_tag[0]?.tag_id === tagId);
                        if (filteredImages.length > 0) {
                            id.post_images = filteredImages;
                        }
                    });
                });
            });

            setGroups(data.vw_groups);
        }
    }, [data, tagId]);

    /* meta의 desc 값 만들기 */
    useEffect(() => {
        if (data && data.vw_groups?.length > 0) {
            /* desc = 토픽제목 + 토픽부제목 + 각 필터칩태그o7개) 각각의 첫번째 포스트 캡션들 (특수문자,이모지제외) */
            let tempMetaDesc = '';

            // 토픽제목
            tempMetaDesc += key + ' ';

            // 토픽부제목
            tempMetaDesc += data.vw_title + ' ';

            data.vw_filters.map((filter) => {
                tempMetaDesc = tempMetaDesc + filter.vw_flt_name + ' ';
            });

            // 필터칩태그 각각의 첫번째 포스트 캡션들
            tempMetaDesc += data.vw_groups.flatMap(group =>
                group.grp_items.map(item =>
                    item.itm_data[0]?.post_desc?.split('\n')[0] || ""
                )
            ).filter(desc => desc !== "").join(' ') + ' ';

            setMetaDesc(clearMetaText(tempMetaDesc));
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle);
        }
    }, [lastScroll]);

    const goMain = () => {
        navigate('home/10001');
    }

    const scrollHandle = () => {
        const top = document.querySelector('.detail_top');

        // 스크롤시 이미지 상단고정
        const topImg = top.querySelector('.topic_thumbnail img');

        if (window.scrollY > top.offsetTop + (window.scrollY * 0.3)) {
            topImg.style.top = (window.scrollY - top.offsetTop - (window.scrollY * 0.3)) + "px";

        } else {
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
        if (window.scrollY > (top.offsetTop + top.clientHeight - (btCategory.clientHeight * 2.5))) {
            btCategory.classList.add('on')
            prevBtn.classList.add('off')
            top.classList.add('off')

        } else {
            btCategory.classList.remove('on')
            prevBtn.classList.remove('off')
            top.classList.remove('off')
        }

        // 스크롤시 카테고리 변경
        document.querySelectorAll('.category_cont').forEach((item) => {
            let itemTop = item.offsetTop - 130;
            let target = item.dataset.cont;

            if (window.scrollY > itemTop) {
                btCategory.querySelectorAll('.swiper-slide').forEach((items) => {
                    items.classList.remove('active')
                })
                let slideTarget = btCategory.querySelector(`.swiper-slide[data-target="${target}"]`)
                slideTarget.classList.add('active')

                categoryPosition(slideTarget);
            }
        })
    }

    // 카테고리 클릭
    const cateClick = (e) => {
        // 타겟 이동시키기
        categoryPosition(e.currentTarget);

        // 해당 컨텐츠로 스크롤 이동
        const target = e.currentTarget.dataset.target;
        let targetTop = 0;

        if (target !== 'category_01') {
            targetTop = document.querySelector(`.category_cont[data-cont="${target}"]`).offsetTop - 125;

        } else {
            targetTop = document.querySelector(`.category_cont[data-cont="${target}"]`).offsetTop - 190;
        }

        window.scrollTo({top: targetTop, behavior: 'smooth'})
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

    /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
    const [isAlertShown, setIsAlertShown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const restrictedElement = document.querySelector('.main.section_box .category_cont');

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
            {
                data && filters?.length > 0 && groups?.length > 0 && (
                    <>
                        <Metatag
                            title={key + ' | 패션앤스타일 (Fashion & Style)' ?? ''}
                            desc={metaDesc ?? ''}
                            image={data.vw_image_url ?? ''}
                            date={data?.created_at ?? ''}
                        />

                        <div className="detail_top">
                            {/* 단독 페이지인데 뒤로가기가 필요한가? */}
                            <div className="btn_wrap">
                                {/*<button onClick={() => navigate(-1)} className="prev_btn">
                                    <img src="/img/prev_arrow_w.svg" alt="이전페이지로 이동"/>
                                </button>*/}
                            </div>

                            <section className={'visual_type'}>
                                <div className={`topic_thumbnail`}>
                                    <a style={{cursor: "pointer"}} onClick={openAppDownModal}>
                                        <img src={data.vw_image_url} alt={data.vw_title + " 이미지"}/>
                                        <div className="txt_box">
                                            <h5 dangerouslySetInnerHTML={{__html: data.vw_title}}></h5>
                                            <p>{data.vw_desc}</p>
                                        </div>
                                    </a>
                                </div>
                            </section>
                        </div>

                        <div className="bottom_category">
                            <h3>{data.vw_title}</h3>
                            <div className="cate_wrap">
                                {/* button 태그변경시 클래스만 유지. */}
                                {/*<button className="prev_btn" onClick={() => navigate(-1)}>
                                    <img src="/img/prev_arrow.svg" alt="이전페이지로 이동"/>
                                </button>*/}
                                <Swiper slidesPerView={'auto'} spaceBetween={12} className="category_swiper">
                                    {
                                        filters.map((filter, filterIdx) => {
                                            if (filter.vw_flt_use_yn === true) {
                                                tempIdx2++;
                                                return <SwiperSlide key={filterIdx} className={filterIdx === 0 && 'active'} onClick={cateClick} data-target={`category_0${tempIdx2}`}><span>{filter.vw_flt_name}</span></SwiperSlide>
                                            }
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>

                        <div className="main section_box">
                            {
                                groups.map((group, vwGroupIdx) => {
                                    return (
                                        <React.Fragment key={vwGroupIdx}>

                                            <section style={{padding: '30px 20px 0'}}>
                                                <h3 style={{paddingBottom: '0'}} className="main_tit">{group.grp_name}</h3>
                                            </section>

                                            {
                                                group.grp_items.map((grpItem, grpItemIdx) => {
                                                    const frmId = grpItem.itm_frm_id; // 프레임 id

                                                    if (grpItem.itm_data.length > 0) {
                                                        const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                                                        if (DynamicFrameComponent) {
                                                            const findFilter = filters.find(filter => filter.vw_flt_itm_id === grpItem.itm_id);

                                                            if (findFilter?.vw_flt_image_url) {
                                                                grpItem.vw_flt_image_url = findFilter.vw_flt_image_url;
                                                                grpItem.vw_flt_name = findFilter.vw_flt_name;
                                                            }

                                                            tempIdx++;

                                                            return (
                                                                <div
                                                                    key={grpItemIdx}
                                                                    className={'category_cont'}
                                                                    data-cont={`category_0${tempIdx}`}
                                                                >

                                                                    <DynamicFrameComponent
                                                                        grpItem={grpItem}
                                                                        openAppDownModalFn={openAppDownModal}
                                                                    />

                                                                </div>
                                                            )
                                                        }
                                                    }
                                                })
                                            }

                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default TopicDetail;