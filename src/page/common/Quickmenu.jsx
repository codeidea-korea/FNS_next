import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AppDownloadModalContext } from "@/context/AppDownloadModalContext";
import { GlobalContext } from "@/context/GlobalContext";

export default function Quickmenu() {
  const { deepLink } = useContext(GlobalContext);
  const { open } = useContext(AppDownloadModalContext);
  const url = usePathname();
  const navigate = useRouter();

  function clickQuickMenu(link) {
    navigate.push(link);
  }

  return (
    <div className="quick_menu">
      <div
        className="appdown_box"
        onClick={() => {
          open(deepLink);
        }}
        style={{ cursor: "pointer" }}
      >
        <img src="/img/fns.svg" alt="패션&스타일 로고" />
        <span>
          데일리 패션과 코디, 최신 뉴스를 만나보세요!
          <br />
          패션 & 스타일 앱으로 보기
        </span>
      </div>
      <ul>
        <li className={url.includes("/home/") ? "active" : ""}>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => clickQuickMenu("/home/10001")}
          >
            <img
              src={`/img/home${url.includes("/home/") ? "_on" : ""}.svg`}
              alt=""
            />
            홈
          </a>
        </li>
        <li className={url === "/foryou" || url === "/posts" ? "active" : ""}>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => clickQuickMenu("/foryou")}
          >
            <img
              src={`/img/recommend${
                url === "/foryou" || url === "/posts" ? "_on" : ""
              }.svg`}
              alt=""
            />
            추천
          </a>
        </li>
        <li className={url === "/mypage" ? "active" : ""}>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => clickQuickMenu("/mypage")}
          >
            <i>
              <img src="/img/logo.svg" alt="" />
            </i>
            마이페이지
          </a>
        </li>
      </ul>
    </div>
  );
}
