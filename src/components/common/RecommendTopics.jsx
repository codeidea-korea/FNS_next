/* 추천 토픽 */
const RecommendTopics = ({openAppDownModalFn, topics}) => {
    return (
        <section className={`topic_list same_type type02`}>
            <h3 className="main_tit">추천 토픽</h3>
            <ul>
                {topics.map((item,index)=>(
                    <li key={index} style={{cursor:"pointer"}} onClick={openAppDownModalFn}>
                        <div className="img_box">
                            <img src={item.image_url_def ?? item.image_url1} alt={item.topic_name+" 이미지"} />
                        </div>
                        <div className="txt_box">
                            <div className="name">{item.topic_name}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default RecommendTopics;