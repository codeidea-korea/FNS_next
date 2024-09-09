import Link from "next/link";

const PostThumbnail = ({
  rank,
  title,
  data,
  associated,
  profileName,
  profileUrl,
  same_type,
  overlapping,
}) => {
  return (
    <section
      className={`topic_list ${same_type ? "same_type" : ""} ${overlapping ? "type02" : ""}`}
    >
      {associated ? (
        <div className="title">
          <Link>
            <i>
              <img src={profileUrl} alt="" />
            </i>{" "}
            <span>{profileName}</span> <img src="/img/more_arrow.svg" alt="" />
          </Link>
        </div>
      ) : (
        <h3
          className="main_tit"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
      )}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <Link>
              <div className="img_box">
                <img src={item.src} alt={item.title + " 이미지"} />
              </div>
              <div className="txt_box">
                {rank && <div className="rank">{index + 1}</div>}
                <div className="name">{item.title}</div>
                <p className="cate">{item.category}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default PostThumbnail;
