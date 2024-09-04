import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React, {useEffect, useState} from "react";

const Frm24 = ({openAppDownModalFn, grpItem})=>{
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(grpItem?.itm_data);
    }, [grpItem]);

    return (
        <section className="issue_slide">
            {grpItem?.itm_title_disp_yn === true ? <h3 className="main_tit">{grpItem.itm_name}</h3> : <></>}
            <Swiper slidesPerView={'2.1'} spaceBetween={8} className="issue_list">
                {data.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <a style={{cursor:"pointer"}} onClick={openAppDownModalFn}>
                            <div className="img_box">
                                <img src={item.post_images[0].post_image_url} alt={item.post_desc+" 이미지"} />
                                {item.post_images[0].post_video_yn === true && <i className="video_thumb"></i>}
                            </div>
                            <div className="txt_box">
                                <div className="name">{item.post_desc}</div>
                                <div className="cate">{item.post_tags[0].tag_name}</div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Frm24;