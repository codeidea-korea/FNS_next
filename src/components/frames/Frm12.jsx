import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const Frm12 = ({openAppDownModalFn, grpItem}) => {
    return (
        <section className="popular_list">
            {grpItem?.itm_title_disp_yn === true ? <h3 className="main_tit">{grpItem.itm_name}</h3> : <></>}
            <Swiper slidesPerView={'auto'} spaceBetween={8} className="popular_list_slide">
                {grpItem.itm_data.map((item, index) => (
                    index < 5 && (
                        <SwiperSlide key={index}>
                            <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                                <div className="img_box">
                                    <img src={item.image_url_def ?? item.image_url1} alt={item.tag_name + " 이미지"}/>
                                </div>
                                <div className="txt_box">
                                    <div className="name">{item.tag_name}</div>
                                </div>
                            </a>
                        </SwiperSlide>
                    )
                ))}
            </Swiper>
        </section>
    )
}

export default Frm12;