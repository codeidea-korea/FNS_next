"use client";

import { useContext, useEffect, useState } from "react";
import { componentMap } from "@/common/componentMap";
import { useRouter } from "next/navigation";
import { AppDownloadModalContext } from "@/context/AppDownloadModalContext";
import { getApi } from "@/utils/apis";
import { GlobalContext } from "@/context/GlobalContext";

const Main = ({ apiUrl }) => {
  const { open } = useContext(AppDownloadModalContext);
  const { deepLink } = useContext(GlobalContext);
  const navigate = useRouter();
  const [frameComponents, setFrameComponents] = useState([]);

  useEffect(() => {
    if (apiUrl) {
      getApi(apiUrl)
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
                        openAppDownModalFn={() => {
                          open(deepLink, false);
                        }}
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
