import React from "react";

const Frm13 = ({openAppDownModalFn, grpItem}) => {
    return (
        <section className={`topic_list same_type`}>
            {grpItem?.itm_title_disp_yn === true ? <h3 className="main_tit">{grpItem.itm_name}</h3> : <></>}
            <ul>
                {grpItem.itm_data.map((item,index)=>(
                    <li key={index}>
                        <a style={{cursor:"pointer"}} onClick={openAppDownModalFn}>
                            <div className="img_box">
                                <img src={item.post_images[0].post_image_url} alt={item.post_desc.replace(/\n/g, <br/>)+" 이미지"} />
                                {item.post_images[0].post_video_yn === true && <i className="video_thumb"></i>}
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

export default Frm13;