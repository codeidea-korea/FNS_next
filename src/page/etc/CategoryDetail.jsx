"use client";

import React, { useContext, useEffect, useState } from "react";
import { componentMap } from "@/common/componentMap";
import { useParams, useRouter } from "next/navigation";
import { clearMetaText } from "@/utils/common";
import { GlobalContext } from "@/context/GlobalContext";
import { getApi } from "@/utils/apis";

const CategoryDetail = () => {
  // const { open } = useContext(AppDownloadModalContext);
  // TODO: 인터랙션 모달 노출을 원할 경우 아래 코드 제거 'open = () => {};'
  open = () => {};
  const { deepLink, setDeepLink } = useContext(GlobalContext);

  const navigate = useRouter();
  const { key } = useParams();

  const [lastScroll, setLastScroll] = useState(0);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [frameComponents, setFrameComponents] = useState([]);
  const [data, setData] = useState({});
  const [metaDesc, setMetaDesc] = useState("");

  useEffect(() => {
    if (
      key === null ||
      key === undefined ||
      (typeof key === "string" && key.trim() === "")
    ) {
      goMain();
    } else {
      getApi(`/api/v1/ui/view/tag_preview_name/${key}`)
        .then((res) => {
          const contents = res.data.data;
          const userAccount =
            contents.vw_desc === "태그상세-셀럽" &&
            contents.vw_user_account?.length > 0
              ? contents.vw_user_account[0]
              : "";
          setData(contents);
          setDeepLink(contents.vw_tag_deep_link);

          const arrFrameComponents = [];

          if (contents && contents.vw_groups?.length > 0) {
            contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {
              vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
                /*
                 * vwGroup.grp_id 값이 '22', '23', '24'인 경우에만 아래 로직을 적용
                 * post_images.post_image_user_tags[0]의 값이 contents.vw_user_account[0]랑 같은 이미지만 추출
                 * */
                if (
                  userAccount &&
                  ["22", "23", "24"].some((id) => vwGroup.grp_id.includes(id))
                ) {
                  grpItem.itm_data.forEach((id) => {
                    const filteredImages = id.post_images.filter(
                      (postImage) =>
                        postImage?.post_image_user_tags[0] === userAccount,
                    );

                    if (filteredImages.length > 0) {
                      id.post_images = filteredImages;
                    }
                  });
                }

                const frmId = grpItem.itm_frm_id; // 프레임 id

                if (grpItem.itm_data.length > 0) {
                  const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                  if (DynamicFrameComponent) {
                    arrFrameComponents.push(
                      <DynamicFrameComponent
                        key={`component_${vwGroupIdx}_${grpItemIdx}`}
                        grpItem={grpItem}
                        openAppDownModalFn={() => {
                          open(deepLink, false);
                        }}
                      />,
                    );
                  }
                }
              });
            });
          }

          setFrameComponents(arrFrameComponents);
        })
        .catch(() => {
          goMain();
        });
    }
  }, [key]);

  /* meta의 desc 값 만들기 */
  useEffect(() => {
    if (data && data.vw_groups?.length > 0) {
      const top5Data = data.vw_groups[2].grp_items[0].itm_data;

      /* desc = Top 5 에 있는 5개 포스트의 캡션들 총합 */
      let tempMetaDesc = "";

      top5Data.map((topData) => {
        tempMetaDesc = tempMetaDesc + topData.post_desc?.split("\n")[0] + " ";
      });

      setMetaDesc(clearMetaText(tempMetaDesc));
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandle);

    return () => {
      window.removeEventListener("scroll", scrollHandle);
    };
  }, [lastScroll]);

  /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
  useEffect(() => {
    const handleScroll = () => {
      const restrictedElement = document.querySelector(
        ".main.section_box .topic_list",
      );

      if (restrictedElement) {
        const sectionBottom =
          restrictedElement.getBoundingClientRect().bottom +
          window.scrollY +
          110;
        const currentScroll =
          window.scrollY +
          window.innerHeight -
          (window.visualViewport
            ? window.visualViewport.height - window.innerHeight
            : 0);

        if (currentScroll > sectionBottom + 50) {
          event.preventDefault();
          window.scrollTo(0, sectionBottom - window.innerHeight);

          open(deepLink, false);
          setIsAlertShown(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAlertShown]);

  const goMain = () => {
    navigate.push("/");
  };

  const scrollHandle = () => {
    const top = document.querySelector(".top_detail");

    // 스크롤시 이전 버튼 같이 따라다니기
    const currentScrollY = window.scrollY;
    const prevBtn = top.querySelector(".btn_wrap");
    const scrollTit = document.querySelector(".scroll_tit");

    if (lastScroll < currentScrollY) {
      prevBtn.classList.remove("on");
      scrollTit.classList.remove("on");
      scrollTit.style.display = "none";
    } else {
      prevBtn.classList.add("on");
      scrollTit.classList.add("on");
      scrollTit.style.display = "flex";
    }

    setLastScroll(currentScrollY);

    // 스크롤시 메뉴 보이기
    if (window.scrollY > top.offsetTop + top.clientHeight) {
      scrollTit.classList.add("active");
      scrollTit.style.display = "flex";
    } else {
      scrollTit.classList.remove("active");
      scrollTit.style.display = "none";
    }
  };

  return (
    <>
      {data && frameComponents && frameComponents.length > 0 && (
        <>
          <div className="top_detail" style={{ padding: "16px 20px 0 20px" }}>
            <div className="btn_wrap"></div>
            <div className="tit_box">
              <h3>{data.vw_title}</h3>
            </div>
          </div>
          <div className="scroll_tit" style={{ display: "none" }}>
            <h3>{data.vw_title}</h3>
          </div>
          <div className="main section_box">{frameComponents}</div>
        </>
      )}
    </>
  );
};

export default CategoryDetail;
