/* 고객사 코멘트 : 26번은 현재 미사용입니다. 개발할 때 고려하지 않으셔도 좋습니다. */
const Frm26 = ({openAppDownModalFn, grpItem}) => {
    return (
        <section className={'topic_list same_type'}>
            {
                grpItem?.itm_title_disp_yn === true &&
                <div className="title">
                    <a style={{cursor:"pointer"}} onClick={openAppDownModalFn}>
                        <i>
                            <img src={grpItem?.itm_data[0]?.tag_type_cd === 'TAG002005' ? grpItem?.itm_data[0].image_url_def : grpItem?.itm_data[0].image_url1} alt={grpItem.itm_name}/>
                        </i>
                        <span>{grpItem.itm_name}</span>
                        <img src="/img/more_arrow.svg" alt="" />
                    </a>
                </div>
            }

            <ul>
                {grpItem?.itm_data.map((item, index) => (
                    <li key={index}>
                        <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                            <div className="img_box">
                                <img src={item?.tag_type_cd === 'TAG002005' ? item.image_url_def : item.image_url1} alt={item.tag_name + " 이미지"}/>
                            </div>
                            <div className="txt_box">
                                <div className="name">{'item.title'}</div>
                                <p className="cate">{item.tag_name}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )

}
export default Frm26;