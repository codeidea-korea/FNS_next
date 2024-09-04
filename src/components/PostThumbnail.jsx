import { Link } from "react-router-dom";

const PostThumbnail = ({rank, title, data, associated, profileName, profileUrl, same_type, overlapping})=>{
    // rank: 랭킹  T|F
    // title : 상단 텍스트  문자열
    // data : 데이터

    // associated : 상단 프로필이미지/이름 표시,, T|F ,    profileName, profileUrl 두가지와 같이 써야함
    // profileName : associated를 true 했을때, 프로필 이름
    // profileUrl : associated를 true 했을때, 프로필 이미지 경로

    // same_type : 리스트 이미지 사이즈가 동일한 스타일 T|F
    // overlapping : 이미지와 텍스트 겹쳐져 있는 스타일 T|F

    return (
        // 기본 클래스 : topic_list
        // 리스트 크기 동일한 타입 : same_type
        // 이미지랑 텍스트 겹쳐지는 타입 : type02
        <section className={`topic_list ${same_type ? "same_type":""} ${overlapping ? "type02":""}`}>
            {associated ? <div className="title">
                <Link><i><img src={profileUrl} alt="" /></i> <span>{profileName}</span> <img src="/img/more_arrow.svg" alt="" /></Link>
            </div> : <h3 className="main_tit" dangerouslySetInnerHTML={{__html:title}}></h3>}
            <ul>
                {data.map((item,index)=>(
                    <li key={index}>
                        <Link>
                            <div className="img_box">
                                <img src={item.src} alt={item.title+" 이미지"} />
                            </div>
                            <div className="txt_box">
                                {rank && <div className="rank">{index+1}</div>}
                                <div className="name">{item.title}</div>
                                <p className="cate">{item.category}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )

}
export default PostThumbnail;