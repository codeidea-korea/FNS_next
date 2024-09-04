import {useEffect, useState} from 'react';
import PostFrame from "@/components/PostFrame";
import TopicThumbnail from "@/components/TopicThumbnail";
import PostThumbnail from "@/components/PostThumbnail";
import PostThumbnailSlide from "@/components/PostThumbnailSlide";
import TagList from "@/components/TagList";

// lottie 추가
import LottieLogo from "@/assets/json/logo.json"
import Lottie from "lottie-react";

const Sample = ()=>{
    const postPreview = [
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
            img:[],
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
    ];
    const bestData = [
        { src:"/img/thumbnail/post_1.png", title:"20대라 해도 믿을 한예슬 근황❤️‍🔥", category:"이연희" },
        { src:"/img/thumbnail/post_2.png", title:"와이드로 편하게🤍 @화이트팬츠", category:"화이트팬츠" },
        { src:"/img/thumbnail/post_3.png", title:"영롱한 셀린느 트리옹프 목걸이✨", category:"셀린느" },
        { src:"/img/thumbnail/post_4.png", title:"힙한 신혼여행 코디🏖️🇹🇭 김보라", category:"김보라" },
        { src:"/img/thumbnail/post_5.png", title:"미모 열일 중인 수지 너무 청순해🖤", category:"수지" },
    ];
    const slideData = [
        { src:"/img/thumbnail/asso_1.jpg", title:"여름이니까 크로셰모자🤍✨", category:"모자" },
        { src:"/img/thumbnail/asso_2.jpg", title:"캠퍼스를 입은 셀럽들의 축제 스타일링💙", category:"파티룩" },
        { src:"/img/thumbnail/asso_3.jpg", title:"여름 코르테즈는 화이트🤍👟", category:"웨딩" },
        { src:"/img/thumbnail/asso_4.jpg", title:"뉴진스 x 무라카미 다카시🌼 🪻 팬아트 출시되나요??", category:"뉴진스" },
    ];
    const popularTag = [
        {src:"/img/thumbnail/topic_1.png", name:"와이드팬츠"},
        {src:"/img/thumbnail/post_1.png", name:"화이트팬츠"},
        {src:"/img/thumbnail/post_2.png", name:"이미스"},
        {src:"/img/thumbnail/post_4.png", name:"아이다스 쇼츠"},
        {src:"/img/thumbnail/topic_5.png", name:"반팔블라우스"},
    ];


    const PreveiwHandle = (e)=>{
        if(e.currentTarget.nextSibling.style.display == "block"){
            e.currentTarget.nextSibling.style.display = "none"
        }else{
            e.currentTarget.nextSibling.style.display = "block"
        }
    }

    const [Appdown,setAppdown] = useState(false);
    const [Appdown2,setAppdown2] = useState(false);
    const [Loading,setLoading] = useState(false);

    useEffect(()=>{
        if(Loading){
            setTimeout(function(){setLoading(false)},2000)
        }
    },[Loading])


    const [lastScroll, setLastScroll] = useState(0);

    useEffect(()=>{
        window.addEventListener('scroll',scrollHandle);
        return ()=>{window.removeEventListener('scroll',scrollHandle)}
    },[lastScroll])

    const scrollHandle = ()=>{
        const top = document.querySelector('.detail_top')

        // 스크롤시 이미지 상단고정
        const topImg = top.querySelector('.topic_thumbnail img')
        if(window.scrollY > top.offsetTop + (window.scrollY * 0.3)){
            topImg.style.top = (window.scrollY - top.offsetTop - (window.scrollY * 0.3)) + "px";
            // (window.scrollY * 0.3)
        }else{
            topImg.style.top = "0px"
        }

        // 스크롤시 이전 버튼 같이 따라다니기
        const currentScrollY = window.scrollY;
        const prevBtn = top.querySelector('.btn_wrap')
        const scrollTit = document.querySelector('.scroll_tit')

        if (lastScroll < currentScrollY) {
            prevBtn.classList.remove('on')
            scrollTit.classList.remove('on')
        } else {
            prevBtn.classList.add('on')
            scrollTit.classList.add('on')
        }

        setLastScroll(currentScrollY)

        // 스크롤시 메뉴 보이기
        
        if(window.scrollY > (top.offsetTop + top.clientHeight)){
            scrollTit.classList.add('active')
        }else{
            scrollTit.classList.remove('active')
        }
    }


    return (
        <div style={{paddingBottom:"120px"}}>

            <div className="detail_top people_detail">
                <div className="btn_wrap"><button className="prev_btn"><img src="/img/prev_arrow_w.svg" alt="이전페이지로 이동" /></button></div>
                <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"강민경"} visualType={true} />
                {/* 팔로잉 시 클래스 following 추가 */}
                <button className="follow_btn">팔로우</button>
            </div>

            {/* 상단 타이틀 추가 */}
            <div className='top_detail'>
                <div className="btn_wrap">
                    <button className="prev_btn"><img src="/img/prev_arrow.svg" alt="이전페이지로 이동" /></button>
                </div>
                <div className="tit_box">
                    <h3>일상룩</h3>
                    <button className="follow_btn">팔로우</button>
                </div>
            </div>

            {/* 스크롤시 메뉴 */}
            <div className='scroll_tit'>
                <button className='prev_btn'><img src="/img/prev_arrow.svg" alt="이전페이지로 이동" /></button>
                <h3>강민경</h3>
                {/* 팔로잉 시 클래스 following 추가 */}
                <button className="follow_btn">팔로우</button>
            </div>



            <h1 style={{fontSize:"30px", fontWeight:"500", textAlign:"center"}}>컴포넌트</h1>


            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 프리뷰<br/>(이미지, 이미지&영상, 영상)</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostFrame data={postPreview[0]} />`}  </p>
            <div style={{display:"none"}}>
                <PostFrame data={postPreview[0]} />
                <PostFrame data={postPreview[1]} />
                <PostFrame data={postPreview[2]} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>토픽 썸네일</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'gold'}}>{`<TopicThumbnail`}</span>{` img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} />`}  </p>
            <div style={{display:"none"}}>
                <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>토픽 썸네일 - 공간X</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'gold'}}>{`<TopicThumbnail`}</span>{` img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} visualType={true} />`}  </p>
            <div style={{display:"none"}}>
                <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} visualType={true} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 넷플릭스 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'aquamarine'}}>{`<PostThumbnailSlide`}</span>{` title={"미니멀한 셀럽 이슈"} data={slideData} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnailSlide title={"미니멀한 셀럽 이슈"} data={slideData} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>태그 - 연관태그</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightcoral'}}>{`<TagList`}</span>{` title={"실시간 인기태그"} data={popularTag} />`}  </p>
            <div style={{display:"none"}}>
                <TagList title={"실시간 인기태그"} data={popularTag} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 랭킹 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightsteelblue'}}>{`<PostThumbnail`}</span>{` rank={true} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={true} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 일반 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightsteelblue'}}>{`<PostThumbnail`}</span>{` rank={false} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>태그 x 포스트 썸네일 일반 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightsteelblue'}}>{`<PostThumbnail`}</span>{` rank={false} associated={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} associated={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>태그 x 포스트 썸네일 2*2 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightsteelblue'}}>{`<PostThumbnail`}</span>{` rank={false} associated={true} same_type={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} associated={true} same_type={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 2*2 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightsteelblue'}}>{`<PostThumbnail`}</span>{` rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 텍스트 겹쳐져있는 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}><span style={{background:'lightsteelblue'}}>{`<PostThumbnail`}</span>{` rank={false} same_type={true} overlapping={true} data={bestData} title={"추천 토픽"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} same_type={true} overlapping={true} data={bestData} title={"추천 토픽"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>일반타이틀</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle} >{`<div className="main_tit">미니멀한 셀럽룩</div>`}  </p>
            <div style={{display:"none"}}>
                <section>
                    <div className="main_tit">미니멀한 셀럽룩</div>
                </section>
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>어플 다운 유도 모달</h2>
            <div style={{textAlign:"center",margin:"10px 0"}}>
                <button onClick={()=>setAppdown(!Appdown)} style={{padding:"5px 10px", backgroundColor:"#000", color:"#fff", borderRadius:"20px"}}>모달 열림 버튼</button>
            </div>
            {/* 앱다운 모달 */}
            <div className={"modal_wrap " + (Appdown ? "open" : "")}>
                <div className="modal_bg" onClick={()=>setAppdown(false)}></div>
                <div className="modal_box">
                    <div className="modal_content appdown_cont">
                        <img src="/img/logo.svg" alt="패션&스타일 로고" />
                        <h6>패션&스타일 앱에서 제공되는 혜택을<br/>놓치고 계신 건 아닌가요?</h6>
                        <p>패션&스타일 앱은 다양한 혜택 및 코디 탭을 제공 중!</p>
                        <button className='down_btn'>앱 이용하기</button>
                        <button className='close_btn' onClick={()=>setAppdown(!Appdown)}>괜찮아요, 모바일웹으로 볼게요.</button>
                    </div>
                </div>
            </div>

            {/* 앱다운 모달 - pc */}
            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>어플 다운 유도 모달 - PC</h2>
            <div style={{textAlign:"center",margin:"10px 0"}}>
                <button onClick={()=>setAppdown2(!Appdown2)} style={{padding:"5px 10px", backgroundColor:"#000", color:"#fff", borderRadius:"20px"}}>모달 열림 버튼</button>
            </div>
            <div className={"modal_wrap " + (Appdown2 ? "open" : "")}>
                <div className="modal_bg" onClick={()=>setAppdown2(false)}></div>
                <div className="modal_box center_box">
                    <div className="modal_content appdown_pc_cont">
                        <div className="img_box">
                            <img src="/img/qr.png" alt="" />
                        </div>
                        <div className="txt_box">
                            <h6>패션 & 스타일 앱에서<br/>트렌디한 패션 정보를 확인해보세요.</h6>
                            <p>QR코드 스캔으로 더 쉽고 빠르게!</p>
                            <button className='close_btn' onClick={()=>setAppdown2(!Appdown2)}>확인</button>
                        </div>
                    </div>
                </div>
            </div>



            <div style={{margin:"20px 0"}}></div>
            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>로딩</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle} >아래 버튼을 눌러 로딩 페이지를 확인해주세요.</p>
            <div style={{textAlign:"center",margin:"10px 0"}}>
                <button onClick={()=>setLoading(true)} style={{padding:"5px 10px", backgroundColor:"#000", color:"#fff", borderRadius:"20px"}}>로딩 확인 버튼</button>
            </div>
            {Loading && <LoadingBox />}

            



        </div>
    )
}

const LoadingBox = ()=>{
    return (
        <div id="loading_lottie"><Lottie speed={5} className='lottie_logo' animationData={LottieLogo}/></div>
    )
}

export default Sample;