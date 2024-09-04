import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import {formatDateString} from "../../common/CommonUtils";

/* 포스트 상세 */
const Post = ({openAppDownModalFn, post, showComment}) => {
    const [postRateClass, setPostRateClass] = useState('');
    const [desc, setDesc] = useState([]);
    const [swiperActive, setSwiperActive] = useState(0);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [, setIsPlaying] = useState(false);
    const [modalImageAccId, setModalImageAccId] = useState('');
    const [modalImageAccName, setModalImageAccName] = useState('');
    const [modalImageAccImgSrc, setModalImageAccImgSrc] = useState('');

    useEffect(() => {
        setPostRateClass(getPostAreaClassForRate(post));
        setDesc(post.post_desc?.split('\n'));

        const video = videoRef.current;

        // video 영상 재생률 표시
        const handleTimeUpdate = () => {
            const currentTime = video.currentTime;
            const duration = video.duration;
            setProgress((currentTime / duration) * 100);
        };

        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (video) {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // 비디오가 재생 중이 아닌 경우에만 play() 호출
                            if (video.paused) {
                                video.play().catch(error => {
                                    console.error('Error playing video:', error);
                                });
                            }
                            setIsPlaying(true);
                        } else {
                            // 비디오가 재생 중인 경우에만 pause() 호출
                            if (!video.paused) {
                                video.pause();
                            }
                            setIsPlaying(false);
                        }
                    });
                },
                // 비디오의 50% 이상이 보여야 재생됨
                {threshold: 0.5}
            );

            observer.observe(video);

            return () => {
                if (video) observer.unobserve(video);
            }
        }
    }, [videoRef]);

    // post_frame_type_cd 값에 따라 포스트 영역의 비율을 정하는 클래스를 구함
    const getPostAreaClassForRate = (post) => {
        const postFrameTypeCd = post?.post_frame_type_cd;
        let classNm = '';

        switch (postFrameTypeCd) {
            case 'FAR001001' : // 4:5
                classNm = 'rate_4vs5';
                break;

            case 'FAR001002' : // 9:14
                classNm = 'rate_9vs14';
                break;

            case 'FAR001003' : // 1:1
                classNm = 'rate_1vs1';
                break;

            case 'FAR001004' : // 5:4
                classNm = 'rate_5vs4';
                break;

            case 'FAR001005' : // 14:9
                classNm = 'rate_14vs9';
                break;

            default :
                if (post?.post_images?.length === 1 && post?.post_images[0]?.post_video_yn === true) {
                    // 9:14 - 포스트가 단독 영상인 경우
                    classNm = 'rate_9vs14';

                } else {
                    // 4:5 - 기본
                    classNm = 'rate_4vs5';
                }

                break;
        }

        return classNm;
    }

    // 이미지 슬라이드 할 때
    const changePostSlide = (swiper) => {
        const activeIndex = swiper.activeIndex;

        // 첫번째, 두번째 이미지만 볼 수 있음
        if (activeIndex === 0 || activeIndex === 1) {
            setSwiperActive(swiper.activeIndex);

            if (activeIndex === 1) {
                // 두번째 이미지인 경우 앱 이용 모달 보여줌
                openAppDownModalFn();
            }

        } else {
            // 세번째 부터는 강제로 두번째 이미지로 이동시키고 앱 이용 모달 보여줌
            swiper.slideTo(1);
            openAppDownModalFn();
        }
    }

    // 인스타 출처 태그 클릭시 모달 열기
    const modalOpen = (e, imageAccId, imageAccName, imageAccImgSrc) => {
        setModalImageAccId(imageAccId);
        setModalImageAccName(imageAccName);
        setModalImageAccImgSrc(imageAccImgSrc);

        let parent = e.currentTarget.closest('.post_frame');
        parent.querySelector('.modal_wrap').classList.add('open');
    }

    // 인스타 출처 태그 모달 닫기
    const modalClose = (e) => {
        let modal = e.currentTarget.closest('.modal_wrap')
        modal.classList.remove('open')
    }

    // 포스트 본문 클릭 이벤트
    const clickDescArea = (e) => {
        let descBox = e.currentTarget.querySelector('.desc');

        if (desc.length > 2) {
            if (descBox.classList.contains('open')) {
                // desc 모든텍스트 다 보일때
                openAppDownModalFn();

            } else {
                // desc 텍스트 일부 가려져있을때
                e.currentTarget.querySelector('.desc').classList.add('open')
            }

        } else {
            // 더보기 버튼 없을때
            openAppDownModalFn();
        }
    }

    // 비디오 onLoadedData 이벤트
    const videoLoadedData = (e) => {
        // 가로가 세로보다 더 긴 경우
        if (e.target.videoWidth > e.target.videoHeight) {
            // 클래스 추가
            e.target.classList.add('type02');
        }
    }

    // 비디오 음소거 버튼 클릭 이벤트
    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    return (
        <section className="post_frame">
            {post && (
                <>
                    {/* 이미지 슬라이드 영역 */}
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={0}
                        pagination={{dynamicBullets: true}}
                        modules={[Pagination]}
                        className={`img_list ${postRateClass}`}
                        onSlideChange={(swiper) => changePostSlide(swiper)}
                    >
                        {/* 이미지가 2개 이상일 때만 SwiperSlide 적용 */}
                        {post.post_images.map((item, index) => {
                            if (item.post_video_yn === true) {
                                return (
                                    <SwiperSlide key={index} className={'video_item'}>
                                        <video ref={videoRef} poster={item.post_image_url} autoPlay muted loop playsInline onLoadedData={videoLoadedData}>
                                            <source src={item.post_video_urls[0].video_file_path} type="video/mp4"/>
                                        </video>
                                        <div className="video_control">
                                            <span style={{width: `${progress}%`}}></span>
                                        </div>
                                        <div className="video_volume">
                                            <button onClick={toggleMute}>
                                                <img src={isMuted ? '/img/volume.svg' : '/img/volume_on.svg'} alt={isMuted ? 'Unmute' : 'Mute'}/>
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                )
                            } else {
                                return (
                                    <SwiperSlide key={index}>
                                        <img src={item.post_image_url} alt={`${post.post_desc} 이미지${(index + 1)}`}/>
                                    </SwiperSlide>
                                )
                            }
                        })}

                        {/* 이미지 우측 하단의 인스타 태그 */}
                        <div className="tag_list">
                            {post.post_images.map((item, index) => {
                                // post_image_acc_name가 없는 경우도 있어서 체크가 필요함
                                const postImageAccFirst = item.post_image_acc[0];

                                let imageAccId = postImageAccFirst?.post_image_acc_name;
                                if (imageAccId) imageAccId = 'instagram @' + imageAccId;

                                const imageAccImgSrc = postImageAccFirst?.post_image_acc_tag[0]?.image_url1 ?? '';
                                const imageAccName = postImageAccFirst?.post_image_acc_tag[0]?.tag_name ?? '';

                                return (
                                    <span key={index} className={swiperActive === index ? "active" : ""} onClick={(e) => modalOpen(e, imageAccId, imageAccName, imageAccImgSrc)}>{imageAccId}</span>
                                )
                            })}
                        </div>

                        {/* 이미지 우측 상단의 번호 */}
                        <div className="pager">{swiperActive + 1} / {post.post_images.length} </div>
                    </Swiper>

                    <div className="txt_box">
                        {/* 좋아요, 댓글, 공유하기 버튼 라인 */}
                        <div className="top_btn">
                            <div>
                                <button onClick={openAppDownModalFn}><img src="/img/zzim.svg" alt="좋아요"/></button>
                                <button onClick={openAppDownModalFn}><img src="/img/chat.svg" alt="댓글"/></button>
                                <button onClick={openAppDownModalFn}><img src="/img/share.svg" alt="공유하기"/></button>
                            </div>
                            <button onClick={openAppDownModalFn}><img src="/img/bookmark.svg" alt="북마크"/></button>
                        </div>

                        {/* 좋아요 라인 */}
                        <div className="like_box">
                            <p>좋아요 {post?.post_like_user_ids?.length ?? 0}개</p>
                            {/*<button onClick={openAppDownModalFn}>더 보기</button>*/}
                        </div>

                        {/* 태그 라인 */}
                        <div className="tag_box">
                            {post.post_tags.map((item, index) => (
                                <button key={index} onClick={openAppDownModalFn}>{item.tag_name}</button>
                            ))}
                        </div>

                        {/* 본문 라인 */}
                        <div className="desc_box" onClick={clickDescArea}>
                            <div className={'desc'}>
                                {desc.map((item, index) => (
                                    <p key={index}>
                                        {item}

                                        {
                                            (desc.length > 2 && index === 1) &&
                                            <button>...더 보기</button>
                                        }
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* 카테고리 라인 */}
                        <div className="category_box">
                            <button onClick={openAppDownModalFn}>{post.post_cate_name}<img src="/img/arrow.svg" alt=""/>
                            </button>
                            <p>{formatDateString(post?.posted_at)}</p>
                        </div>

                        {/* 작성된 댓글 */}
                        {
                            (showComment && post?.post_comment?.length > 0) &&
                            <div className="comment_list">
                                {
                                    post.post_comment.length > 2 ? (
                                        <button style={{marginBottom: '10px'}} onClick={openAppDownModalFn}>
                                            댓글 {post.post_comment.length}개 모두 보기
                                        </button>
                                    ) : <></>
                                }

                                {post.post_comment.slice(0, 2).map((item, index) => (
                                    <div key={index} className='comment_item'>
                                        <b>{item.created_user_name}</b><span>{item.cmt_desc}</span>
                                    </div>
                                ))}
                            </div>
                        }

                        {/* 댓글 작성 */}
                        <div className="comment_box">
                            <i><img src="/img/profile_64x64.svg" alt=""/></i>
                            <div className="comment" onClick={openAppDownModalFn}>댓글 달기</div>
                            <button onClick={openAppDownModalFn}>게시</button>
                        </div>
                    </div>

                    {/* 인스타그램 출처 모달 */}
                    <div className="modal_wrap" id='source-modal'>
                        <div className="modal_bg" onClick={modalClose}></div>
                        <div className="modal_box">
                            <div className="modal_header"><h3>출처 목록</h3></div>
                            <div className="modal_content">
                                <div className="insta_item">
                                    {
                                        <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                                            <i className={modalImageAccImgSrc ? modalImageAccImgSrc : 'insta_icon'}>
                                                <img src={modalImageAccImgSrc ? modalImageAccImgSrc : "/img/insta_icon.svg"} alt=""/>
                                            </i>
                                            <div>
                                                {modalImageAccName ? <p>{modalImageAccName}</p> : <></>}
                                                {modalImageAccId ? <p>{modalImageAccId}</p> : <></>}
                                            </div>
                                            <img src="/img/more_arrow.svg" alt=""/>
                                        </a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Post;