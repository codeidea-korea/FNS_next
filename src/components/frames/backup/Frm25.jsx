const Frm25 = ({openAppDownModalFn, grpItem}) => {
    return (
        <section className={`topic_list`}>
            <div className="title">
                <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                    <i>
                        <img src={grpItem?.itm_data[0]?.tag_type_cd === 'TAG002005' ? grpItem?.itm_data[0].image_url_def : grpItem?.itm_data[0].image_url1} alt={grpItem.itm_name}/>
                    </i>
                    <span>{grpItem.itm_name}</span>
                    <img src="/img/more_arrow.svg" alt=""/>
                </a>
            </div>
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

export default Frm25;