import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';

/* 이 코드는 사용하지 않고, /common/Post.jsx 사용중 */

const Frm1 = ({openAppDownModalFn, grpItem}) => {
    const [desc, setDesc] = useState([]);
    const [data, setData] = useState({});
    const [swiperActive, setSwiperActive] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setData(grpItem?.itm_data[0]);
    }, [grpItem]);

    useEffect(() => {
        if (data.post_cate_id) {
            setDesc(data.post_desc.split('\n'));
        }
    }, [data]);

    const descHandle = (e) => {
        let descBox = e.currentTarget.querySelector('.desc');

        if (desc.length > 2) { // 더보기 버튼 있을때
            if (descBox.classList.contains('open')) {
                // desc 모든텍스트 다 보일때
                navigate('/posts')

            } else {
                // desc 텍스트 일부 가려져있을때
                e.currentTarget.querySelector('.desc').classList.add('open')
            }

        } else {
            // 더보기 버튼 없을때
            navigate('/posts')
        }
    }

    // 모달 제어
    const modalOpen = (e) => {
        let parent = e.currentTarget.closest('.post_frame')
        parent.querySelector('.modal_wrap').classList.add('open')
    }

    const modalClose = (e) => {
        let modal = e.currentTarget.closest('.modal_wrap')
        modal.classList.remove('open')
    }

    return (
        <section className="post_frame">
            {
                data.post_cate_id && (
                    <>
                        {/* 이미지 영역 */}
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={0}
                            pagination={{dynamicBullets: true,}}
                            modules={[Pagination]}
                            className={`img_list`}
                            onSlideChange={(swiper) => setSwiperActive(swiper.activeIndex)}
                        >
                            {data.post_images.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img src={item.post_image_url} alt={`${data.post_desc} 이미지${(index + 1)}`}/>
                                </SwiperSlide>
                            ))}

                            <div className="tag_list">
                                {data.post_images.map((item, index) => (
                                    <span key={index} className={swiperActive === index ? "active" : ""} onClick={modalOpen}>instagram @{item.post_image_acc[0].post_image_acc_name}</span>
                                ))}
                            </div>
                            <div className="pager">{swiperActive + 1} / {data.post_images.length}</div>
                        </Swiper>

                        {/* 텍스트 영역 */}
                        <div className="txt_box">
                            <div className="top_btn">
                                <div>
                                    <button><img src="/img/zzim.svg" alt="좋아요"/></button>
                                    <button><img src="/img/chat.svg" alt="댓글"/></button>
                                    <button><img src="/img/share.svg" alt="공유하기"/></button>
                                </div>
                                <button><img src="/img/bookmark.svg" alt="북마크"/></button>
                            </div>
                            <div className="like_box">
                                <p>좋아요 {data?.post_like_user_ids?.length ?? 0}개</p>
                                <button>더 보기</button>
                            </div>
                            <div className="tag_box">
                                {data.post_tags.map((item, index) => (<button key={index}>{item.tag_name}</button>))}
                            </div>
                            <div className="desc_box" onClick={descHandle}>
                                <div className={'desc'}>
                                    {desc.map((item,index)=>(
                                        <p key={index}>{item}{(desc.length > 2 && index === 1 )&& <button>...더 보기</button>}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="category_box">
                                <button>{data.post_cate_name}<img src="/img/arrow.svg" alt=""/></button>
                                <p>{data?.posted_at}</p>
                            </div>
                            <div className="comment_list">
                                <p>댓글 16개 모두 보기</p>
                                <div className='comment_item'><b>yoongarden</b><span>우정하자 🔥</span></div>
                                <div className='comment_item'><b>userab</b><span>크리스탈 언니 여름 일상룩 아이템~</span></div>
                            </div>
                            <div className="comment_box">
                                <i><img src="/img/profile_img.jpg" alt=""/></i>
                                <div className="comment">댓글 달기</div>
                                <button>게시</button>
                            </div>
                        </div>

                        {/*/!* 인스타그램 출처 *!/*/}
                        {/*<div className="modal_wrap" id='source-modal'>*/}
                        {/*    <div className="modal_bg" onClick={modalClose}></div>*/}
                        {/*    <div className="modal_box">*/}
                        {/*        <div className="modal_header"><h3>출처 목록</h3></div>*/}
                        {/*        <div className="modal_content">*/}
                        {/*            <div className="insta_item">*/}
                        {/*                <a style={{cursor: "pointer"}} onClick={openAppDownModal}>*/}
                        {/*                    <i><img src="/img/insta_jennie.jpg" alt=""/></i>*/}
                        {/*                    <div>*/}
                        {/*                        <b>제니</b>*/}
                        {/*                        <span>instagram @jennierubyjane</span>*/}
                        {/*                    </div>*/}
                        {/*                    <img src="/img/more_arrow.svg" alt=""/>*/}
                        {/*                </a>*/}
                        {/*                <a style={{cursor: "pointer"}} onClick={openAppDownModal}>*/}
                        {/*                    <i><img src="/img/insta_jennie.jpg" alt=""/></i>*/}
                        {/*                    <div>*/}
                        {/*                        <b>제니</b>*/}
                        {/*                        <span>instagram @jennierubyjane</span>*/}
                        {/*                    </div>*/}
                        {/*                    <img src="/img/more_arrow.svg" alt=""/>*/}
                        {/*                </a>*/}
                        {/*                <a style={{cursor: "pointer"}} onClick={openAppDownModal}>*/}
                        {/*                    <i className="insta_icon"><img src="/img/insta_icon.svg" alt=""/></i>*/}
                        {/*                    <div>*/}
                        {/*                        <p>instagram @jemmg_</p>*/}
                        {/*                    </div>*/}
                        {/*                </a>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </>
                )
            }
        </section>
    )
}

export default Frm1;