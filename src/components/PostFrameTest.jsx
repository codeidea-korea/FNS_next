import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Pagination} from 'swiper/modules';

const PostFrame = ({data, descOpen}) => {
    const [swiperActive, setSwiperActive] = useState(0)

    return (
        <section className="post_frame">
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={0}
                pagination={{dynamicBullets: true,}}
                modules={[Pagination]}
                className={`img_list`}
                onSlideChange={(swiper) => setSwiperActive(swiper.activeIndex)}
            >
                {data?.post?.post_images.map((item, index) => (
                    <SwiperSlide key={`key_img_${index}`}>
                        <img src={item.post_image_url} alt={''}/>
                    </SwiperSlide>
                ))}

                <div className="tag_list">
                    {data?.post?.post_images.map((item, index) => (
                        <span key={`key_tag_${index}`} className={swiperActive === index ? "active" : ""}>instagram @{item.post_image_acc[0].post_image_acc_name}</span>
                    ))}
                </div>

                <div className="pager">{swiperActive + 1} / {data?.post?.post_images.length + (data.video ? data.video.length : 0)}</div>
            </Swiper>
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
                    <p>좋아요 {data?.post?.post_like_user_ids ? data?.post?.post_like_user_ids.length : 0}개</p>
                </div>
                <div className="tag_box">
                    {data?.post?.post_tags.map((item, index) => (
                        <button key={`key_post_tag_${index}`}>{item.tag_name}</button>))}
                </div>
                <div className="desc_box">
                    <div className={'desc open'}>
                        <p>
                            {data?.post?.post_desc?.split('\n').map((item, index) => (
                                <React.Fragment key={`key_desc_${index}`}>
                                    {item}
                                    <br/>
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </div>
                <div className="category_box">
                    <button>{data?.post?.post_cate_name}<img src="/img/arrow.svg" alt=""/></button>
                    <p>{data?.post?.posted_at}</p>
                </div>
                {/*
                <div className="category_box">
                    <button>{data.category}<img src="/img/arrow.svg" alt="" /></button>
                    <p>1일 전</p>
                </div>
                <div className="comment_list">
                    <p>댓글 16개 모두 보기</p>
                    <div className='comment_item'><b>yoongarden</b><span>우정하자 🔥</span></div>
                    <div className='comment_item'><b>userab</b><span>크리스탈 언니 여름 일상룩 아이템~</span></div>
                </div>
                <div className="comment_box">
                    <i><img src="/img/profile_img.jpg" alt="" /></i>
                    <div className="comment">댓글 달기</div>
                    <button>게시</button>
                </div>*/}
            </div>
        </section>
    )
}

export default PostFrame;