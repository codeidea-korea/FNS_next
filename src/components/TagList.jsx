import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const TagList = ({title,data})=>{
    return (
        <section className="popular_list">
            <h3 className="main_tit" dangerouslySetInnerHTML={{__html:title}}></h3>
            <Swiper slidesPerView={'auto'} spaceBetween={8} className="popular_list_slide">
                {data.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <Link>
                            <div className="img_box">
                                <img src={item.src} alt={item.name+" 이미지"} />
                            </div>
                            <div className="txt_box">
                                <div className="name">{item.name}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </section>
    )
}
export default TagList; 