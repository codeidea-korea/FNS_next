import {useEffect, useState} from "react";

const Frm21 = ({openAppDownModalFn, grpItem}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(grpItem?.itm_data[0]);
    }, [grpItem]);

    return (
        <section>
            {grpItem?.itm_title_disp_yn === true ? <h3 className="main_tit">{grpItem.itm_name}</h3> : <></>}
            <div className={`topic_thumbnail`}>
                <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                    <img src={data.image_url_def ?? data.image_url1} alt={grpItem.itm_name + " 이미지"}/>
                    <div className="txt_box">
                        <h5 dangerouslySetInnerHTML={{__html: data.topic_name}}></h5>
                        <p>{data.topic_desc}</p>
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Frm21;