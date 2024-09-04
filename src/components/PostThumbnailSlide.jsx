import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const PostThumbnailSlide = ({title,data})=>{
    return (
        <section className="issue_slide">
            <h3 className="main_tit">{title}</h3>
            <Swiper slidesPerView={'2.1'} spaceBetween={8} className="issue_list">
                {data.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <Link>
                            <div className="img_box">
                                <img src={item.src} alt={item.title+" 이미지"} />
                            </div>
                            <div className="txt_box">
                                <div className="name">{item.title}</div>
                                <div className="cate">{item.category}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default PostThumbnailSlide;