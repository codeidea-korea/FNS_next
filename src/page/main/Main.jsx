"use client";

import { useContext, useEffect, useState } from "react";
import { componentMap } from "@/common/componentMap";
import AxiosInstance from "@/common/AxiosInstance";
import { useRouter } from "next/navigation";
import { AppDownloadModalContext } from "@/context/AppDownloadModalContext";

/* TODO : 고객사에게 전달받은 내용들
 *   1번 과 25번은 현재  사용중이지 않습니다.
 *   하지만 1번 프레임의 경우 UI가 추천영역의 게시글과 동일하오니, 작업 하실 때 참고 바랍니다.
 *   25번 프레임의 경우 현재 28번 프레임으로 변경되어 사용중입니다.
 * */

const Main = ({ apiUrl }) => {
  const { open } = useContext(AppDownloadModalContext);
  const navigate = useRouter();
  const [frameComponents, setFrameComponents] = useState([]);

  useEffect(() => {
    if (apiUrl) {
      AxiosInstance.get(apiUrl)
        .then((res) => {
          const contents = res.data.data;
          const arrFrameComponents = [];

          /* 태그(셀럽)인 경우 이미지 중에서 태그에 맞는걸 골라서 보여줘야됨 */
          if (contents && contents.vw_groups?.length > 0) {
            if (contents.vw_desc === "뷰페이지-태그(셀럽)") {
              const pathSplitSlash = window.location.pathname.split("/");
              const tagId = pathSplitSlash[pathSplitSlash.length - 2];

              contents.vw_groups.forEach((vwGroup) => {
                vwGroup.grp_items.forEach((grpItem) => {
                  grpItem.itm_data.forEach((id) => {
                    if (id?.post_images?.length > 0) {
                      const filteredImages = id?.post_images.filter(
                        (pi) =>
                          pi?.post_image_acc[0]?.post_image_acc_tag[0]
                            ?.tag_id === tagId,
                      );
                      if (filteredImages.length > 0) {
                        id.post_images = filteredImages;
                      }
                    }
                  });
                });
              });
            }

            contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {
              vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
                const frmId = grpItem.itm_frm_id; // 프레임 id

                if (grpItem.itm_data.length > 0) {
                  const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                  if (DynamicFrameComponent) {
                    arrFrameComponents.push(
                      <DynamicFrameComponent
                        key={`component_${vwGroupIdx}_${grpItemIdx}`}
                        grpItem={grpItem}
                        openAppDownModalFn={open}
                      />,
                    );
                  }
                }
              });
            });
          } else {
            navigate.push("home/10001");
          }

          setFrameComponents(arrFrameComponents);
        })
        .catch(() => {
          navigate.push("home/10001");
        });
    }
  }, [apiUrl]);

  return (
    <>
      <div className="main section_box">{frameComponents}</div>
    </>
  );
};

export default Main;
