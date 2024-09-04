import { Link } from "react-router-dom";

const TopicThumbnail = ({img,title,desc,bigTitle,visualType})=>{
    // img: 이미지 경로
    // title : 타이틀
    // desc : 설명글
    // bigTitle : 메인 타이틀
    // visualType : 상단 비쥬얼로 들어갈 시 (임의로 만들어둠)

    return (
        <section className={`${visualType?"visual_type":""}`}>
            {bigTitle && <div className="main_tit">{bigTitle}</div>}
            <div className={`topic_thumbnail`}>
                <Link>
                    <img src={img} alt={title+" 이미지"} />
                    <div className="txt_box">
                        <h5 dangerouslySetInnerHTML={{__html:title}}></h5>
                        <p>{desc}</p>
                    </div>
                </Link>
            </div>
        </section>
    )
}
export default TopicThumbnail;