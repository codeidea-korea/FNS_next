import AxiosInstance from "@/common/AxiosInstance";
import TopicDetail from "@/page/etc/TopicDetail";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const res = await AxiosInstance.get(
      `/api/v1/ui/viewpage/topic_preview_name/${key}`
    );
    const data = res.data.data;

    let metaDesc = key + " ";
    metaDesc += data.vw_title + " ";
    data.vw_filters.map((filter) => {
      metaDesc = metaDesc + filter.vw_flt_name + " ";
    });

    // 필터칩태그 각각의 첫번째 포스트 캡션들
    metaDesc +=
      data.vw_groups
        .flatMap((group) =>
          group.grp_items.map(
            (item) => item.itm_data[0]?.post_desc?.split("\n")[0] || ""
          )
        )
        .filter((desc) => desc !== "")
        .join(" ") + " ";

    return {
      title: params.key + " | 패션앤스타일 (Fashion & Style)" ?? "",
      description: metaDesc,
      image: data.vw_image_url ?? "",
      date: data?.created_at ?? "",
    };
  } catch (error) {
    redirect("/home/10001");
  }
}

export const generateViewport = () => {
  return {
    width: "device-width",
    initialScale: 1,
  };
};

export default function Page() {
  return <TopicDetail />;
}
