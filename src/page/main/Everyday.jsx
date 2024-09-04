import TagList from "@/components/TagList";
import PostThumbnail from "@/components/PostThumbnail";
import TopicThumbnail from "@/components/TopicThumbnail"
import Metatag from "@/components/Metatag";

const Everyday = ()=>{
    const bestData = [
        { src:"/img/thumbnail/post_1.png", title:"20대라 해도 믿을 한예슬 근황❤️‍🔥", category:"이연희" },
        { src:"/img/thumbnail/post_2.png", title:"와이드로 편하게🤍 @화이트팬츠", category:"화이트팬츠" },
        { src:"/img/thumbnail/post_3.png", title:"영롱한 셀린느 트리옹프 목걸이✨", category:"셀린느" },
        { src:"/img/thumbnail/post_4.png", title:"힙한 신혼여행 코디🏖️🇹🇭 김보라", category:"김보라" },
        { src:"/img/thumbnail/post_5.png", title:"미모 열일 중인 수지 너무 청순해🖤", category:"수지" },
    ];
    const popularTag = [
        {src:"/img/thumbnail/topic_1.png", name:"와이드팬츠"},
        {src:"/img/thumbnail/post_1.png", name:"화이트팬츠"},
        {src:"/img/thumbnail/post_2.png", name:"이미스"},
        {src:"/img/thumbnail/post_4.png", name:"아이다스 쇼츠"},
        {src:"/img/thumbnail/topic_5.png", name:"반팔블라우스"},
    ];
    const beautyData = [
        { src:"/img/thumbnail/img_1.png", title:"단발청순 스타일은 채수빈처럼💖", category:"채수빈" },
        { src:"/img/thumbnail/img_2.png", title:"중단발이 끌리는 요즘💇🏻‍♀️🌞", category:"중단발" },
        { src:"/img/thumbnail/img_3.png", title:"더워지니까 돌아온 단발병💇🏻‍♀️", category:"단발" },
        { src:"/img/thumbnail/img_4.png", title:"샌들과 찰떡 프렌치 페디큐어🤍", category:"네일" },
        { src:"/img/thumbnail/img_5.png", title:"주지훈 은퇴작 아니냐는 영화 탈출🧔🏻‍♀️", category:"주지훈" },
    ];


    return (
        <>
            <div className="main">
                <PostThumbnail rank={true} title={"인기 스타일 BEST 5"} data={bestData} />

                <TopicThumbnail img={"/img/thumbnail/topic_3.png"} title={"가을부터<br/>겨울까지, 아이템.."} desc={"러블리 & 로맨틱 스타일링❣️"} />

                <PostThumbnail rank={false} title={"지금 봐야할 핫이슈"} data={beautyData} />

                <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"여름의 매력을<br/>뽐내는 비키니"} desc={"입으려면 운동 밖에🏋🏻‍♀️"} />

                <TagList title={"인기 브랜드"} data={popularTag} />

                <TopicThumbnail img={"/img/thumbnail/topic_5.png"} title={"블랙 컬러로<br/>다양한 스타일링"} desc={"심플&시크룩엔 필수템 블랙룩🩶"} />

                <TagList title={"실시간 인기태그"} data={popularTag} />

                <PostThumbnail rank={false} title={"작년의 HOT 트렌드"} data={bestData} />
                
            </div>
        </>
    )
}
export default Everyday;