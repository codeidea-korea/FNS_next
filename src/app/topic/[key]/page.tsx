import TopicDetail from "@/page/etc/TopicDetail";
import { redirect } from "next/navigation";
import { clearMetaText } from "@/utils/common";
import { makeMetadata } from "@/utils/metadata";
import { getApi } from "@/utils/apis";

interface Props {
  params: { key: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const { data } = await getApi<TopicPreview>(
      `/api/v1/ui/viewpage/topic_preview_name/${params.key}`,
    );

    if (data?.data === null) {
      throw new Error("data.data is null");
    }

    let tempMetaDesc = "";
    tempMetaDesc += data.data.vw_title + " ";
    tempMetaDesc += data.data.vw_desc + " ";
    data.data.vw_filters.map((filter) => {
      tempMetaDesc = tempMetaDesc + filter.vw_flt_name + " ";
    });

    // 필터칩태그 각각의 첫번째 포스트 캡션들
    tempMetaDesc +=
      data.data.vw_groups
        .flatMap((group) =>
          group.grp_items.map(
            (item) => item.itm_data[0]?.post_desc?.split("\n")[0] || "",
          ),
        )
        .filter((desc) => desc !== "")
        .join(" ") + " ";

    return makeMetadata(
      decodeURIComponent(params.key) + " | 패션앤스타일 (Fashion & Style)" ??
        "",
      clearMetaText(tempMetaDesc),
      `https://www.fashionandstyle.com/topic/${decodeURIComponent(params.key)}`,
    );
  } catch (error) {
    redirect("/home/10001");
  }
}

export function generateViewport(): { width: string; initialScale: number } {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

export default function Page() {
  return <TopicDetail />;
}
