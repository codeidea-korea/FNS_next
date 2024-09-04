
import PostFrame from "@/components/PostFrame";
import PostThumbnail from "@/components/PostThumbnail";
import Metatag from "@/components/Metatag";

const Recommend = ()=>{
    const feedData = [
        {
            img:["/img/recommend/feed01_1.jpg","/img/recommend/feed01_2.jpg","/img/recommend/feed01_3.jpg","/img/recommend/feed01_4.jpg","/img/recommend/feed01_5.jpg","/img/recommend/feed01_6.jpg","/img/recommend/feed01_7.jpg","/img/recommend/feed01_8.jpg"],
            img_id:["dimemtl"],
            tag:["아디다스","아디다스 운동화","콜라보"],
            like:0,
            category:"캠페인 아이템",
            desc:"테니스를 만난 스케이트보드🎾🛹<br/>다임x아디다스 스탠스미스 6월 29일 발매예정📅"
        },
        {
            img:["/img/recommend/feed02_1.jpg","/img/recommend/feed02_2.jpg","/img/recommend/feed02_3.jpg","/img/recommend/feed02_4.jpg"],
            img_id:["jonasbaang","j__.nguyen","jaycee_yg","_loonirvana"], // 각이미지마다 인스타 아이디 다를때,
            tag:["반팔셔츠","시즌코디","넥타이"],
            like:0,
            category:"일상룩",
            desc:"반팔셔츠에 타이 낫밷 조합 셔츠👔"
        },
        {
            img:["/img/recommend/feed03_1.jpg","/img/recommend/feed03_2.jpg","/img/recommend/feed03_3.jpg","/img/recommend/feed03_4.jpg"],
            img_id:["calvinklein"],
            tag:["뉴진스","콜라보","캘빈클라인"],
            like:0,
            category:"셀럽 이슈",
            desc:"청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
        {
            video:["/img/thumbnail/video_1.png"],
            img:["/img/recommend/feed03_1.jpg","/img/recommend/feed03_2.jpg","/img/recommend/feed03_3.jpg","/img/recommend/feed03_4.jpg"],
            img_id:["calvinklein"],
            tag:["뉴진스","콜라보","캘빈클라인"],
            like:0,
            category:"셀럽 이슈",
            desc:"청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
        {
            video:["/img/thumbnail/video_1.png"],
            img:[],
            img_id:["calvinklein"],
            tag:["뉴진스","콜라보","캘빈클라인"],
            like:0,
            category:"셀럽 이슈",
            desc:"청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
    ];

    const topic = [
        {src:"/img/thumbnail/asso_2.jpg", title:"바지로 완성하는 데일리룩"},
        {src:"/img/thumbnail/asso_3.jpg", title:"바지로 완성하는 데일리룩"},
        {src:"/img/thumbnail/asso_3.jpg", title:"바지로 완성하는 데일리룩"},
        {src:"/img/thumbnail/asso_2.jpg", title:"바지로 완성하는 데일리룩"},
    ]


    return (
        <>
            <div className="recommend">
                <PostFrame data={feedData[4]} /> {/* 비디오만 있을때 */}
                <PostFrame data={feedData[3]} /> {/* 비디오랑 이미지 같이 있을떄 */}
                <PostFrame data={feedData[2]} /> {/* 이미지만 있을때 */}

                {/* 추천토픽 */}
                <PostThumbnail rank={false} same_type={true} overlapping={true} title={"추천 토픽"} data={topic} />

                <PostFrame data={feedData[0]} />
                <PostFrame data={feedData[1]} />
            </div>
        </>
    )
}

export default Recommend;