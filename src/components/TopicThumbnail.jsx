import Link from "next/link";

const TopicThumbnail = ({ img, title, desc, bigTitle, visualType }) => {
  return (
    <section className={`${visualType ? "visual_type" : ""}`}>
      {bigTitle && <div className="main_tit">{bigTitle}</div>}
      <div className={`topic_thumbnail`}>
        <Link>
          <img src={img} alt={title + " 이미지"} />
          <div className="txt_box">
            <h5 dangerouslySetInnerHTML={{ __html: title }}></h5>
            <p>{desc}</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
export default TopicThumbnail;
