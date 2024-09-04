import 'swiper/css'; // Import Swiper styles
import {openAppDownModal} from '../../common/AppDownModalUtil';
import GlobalAppDownModal from "../../common/AppDownModalUtil";
import React from "react";

const Test = () => {
    return (
        <>
            <GlobalAppDownModal/>
            <div className='appdown_box'>
                <h1 className="logo">
                    <a href={''}>
                        <img src="/img/logo.svg" alt=""/>
                    </a>
                    <span>패션 & 스타일 앱에서 더 편리하게</span>
                </h1>
                <button type={'button'} onClick={openAppDownModal}>앱으로 이동</button>
            </div>
        </>
    )
}

export default Test;