"use client";

import React, { useContext, useEffect, useState } from "react";
import { componentMap } from "@/common/componentMap";
import AxiosInstance from "../../common/AxiosInstance";
import { useParams, useRouter } from "next/navigation";
import Post from "../../components/common/Post";
import { AppDownloadModalContext } from "@/context/AppDownloadModalContext";
import { clearMetaText } from "@/utils/common";
import { GlobalContext } from "@/context/GlobalContext";

const PostDetail = () => {
  const { open } = useContext(AppDownloadModalContext);
  const { deepLink, setDeepLink } = useContext(GlobalContext);

  const navigate = useRouter();
  const { yy, mm, dd, key } = useParams();

  const [isAlertShown, setIsAlertShown] = useState(false);
  const [frameComponents, setFrameComponents] = useState([]);
  const [post, setPost] = useState({});
  const [suggest, setSuggest] = useState({});
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  useEffect(() => {
    if (yy && mm && dd && key) {
      /* 포스트 API 호출 */
      AxiosInstance.get(`/api/v1/post/preview_name/${yy}${mm}${dd}/${key}`)
        .then((res) => {
          const contents = res.data.data;
          setPost(contents.post);
          setSuggest(contents.suggest);
          setDeepLink(contents.post.post_deep_link);

          const arrFrameComponents = [];

          contents.suggest.vw_groups.forEach((vwGroup, vwGroupIdx) => {
            vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
              const frmId = grpItem.itm_frm_id; // 프레임 id

              const itm_link_param1 = grpItem.itm_link_param1;
              const itm_link_id = grpItem.itm_link_id;

              // (포스트 상세의 프레임 28) + (grpItem.itm_link_param1값이 TAG002002, TAG002012, TAG002005) 인 경우
              if (
                frmId === "28" &&
                (itm_link_param1 === "TAG002002" ||
                  itm_link_param1 === "TAG002012" ||
                  itm_link_param1 === "TAG002005")
              ) {
                // itm_link_id를 이용해서 맞는 이미지를 추출
                grpItem.itm_data.forEach((id) => {
                  const filteredImages = id.post_images.filter(
                    (pi) =>
                      pi?.post_image_acc[0]?.post_image_acc_tag[0]?.tag_id ===
                      itm_link_id,
                  );

                  if (filteredImages.length > 0) {
                    id.post_images = filteredImages;
                  }
                });

                if (grpItem.itm_data.length > 4) {
                  grpItem.itm_data = grpItem.itm_data.slice(0, 4);
                }
              }

              if (grpItem.itm_data.length > 0) {
                const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                if (DynamicFrameComponent) {
                  arrFrameComponents.push(
                    <DynamicFrameComponent
                      key={`component_${vwGroupIdx}_${grpItemIdx}`}
                      grpItem={grpItem}
                      openAppDownModalFn={() => {
                        open(deepLink);
                      }}
                    />,
                  );
                }
              }
            });
          });

          setFrameComponents(arrFrameComponents);
        })
        .catch(() => {
          goMain();
        });
    } else {
      goMain();
    }
  }, []);

  /* meta의 desc 값 만들기 */
  useEffect(() => {
    if (
      post.post_images?.length > 0 &&
      suggest?.vw_groups?.length > 0 &&
      frameComponents.length > 0
    ) {
      /* meta title */
      let tempMetaTitle = post.post_desc?.split("\n")[0];
      setMetaTitle(
        clearMetaText(tempMetaTitle) + " | 패션앤스타일 (Fashion & Style)",
      );

      /* meta desc */
      /* desc = post_desc 텍스트 전부 + 첫번째 태그 1번 포스트캡션 + 두번째 태그 1번 포스트캡션 */
      let tempMetaDesc = post.post_desc + " ";

      suggest.vw_groups.map((vwGroup, idx) => {
        if (idx < 2) {
          tempMetaDesc =
            tempMetaDesc +
            vwGroup?.grp_items[0]?.itm_data[0]?.post_desc?.split("\n")[0] +
            " ";
        }
      });

      setMetaDesc(clearMetaText(tempMetaDesc));
    }
  }, [post, suggest, frameComponents]);

  /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
  useEffect(() => {
    const handleScroll = () => {
      const restrictedElement = document.querySelector(
        ".main.section_box .post_frame",
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

          open(deepLink);
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
    navigate.push("/home/10001");
  };

  return (
    <>
      {post && post.post_images?.length > 0 && (
        <>
          <div className="main section_box">
            <Post
              openAppDownModalFn={() => {
                open(deepLink);
              }}
              post={post}
              showComment={true}
            />

            {frameComponents}
          </div>
        </>
      )}
    </>
  );
};

export default PostDetail;
