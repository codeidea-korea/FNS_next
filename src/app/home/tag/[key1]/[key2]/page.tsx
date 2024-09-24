import Home from "@/page/main/Home";
import { makeMetadata } from "@/utils/metadata";
import { Metadata } from "next";
import { clearMetaText } from "@/utils/common";
import { getApi } from "@/utils/apis";
import { redirect } from "next/navigation";

interface Props {
  params: { key1: string; key2: string };
}

export function generateViewport(): { width: string; initialScale: number } {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

function getMetaDescription(tagPreview: TagPreview): string {
  let metaDesc = "";
  if (tagPreview && tagPreview.vw_groups?.length > 0) {
    const top5Data = tagPreview.vw_groups[1].grp_items[0].itm_data;

    top5Data.map((topData) => {
      metaDesc = metaDesc + topData.post_desc?.split("\n")[0] + " ";
    });

    return clearMetaText(metaDesc);
  }
  return metaDesc;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await getApi<TagPreview>(
      `/api/v1/ui/view/tag_preview_name/${params.key2}`,
    );
    const metaDescription = data.data ? getMetaDescription(data.data) : "";

    return makeMetadata(
      decodeURIComponent(params.key2) + " | 패션앤스타일 (Fashion & Style)" ??
        "",
      clearMetaText(metaDescription ?? ""),
      decodeURIComponent(
        "https://www.fashionandstyle.com/home/tag/" +
          params.key1 +
          "/" +
          params.key2,
      ),
      data.data?.vw_groups[1]?.grp_items[0]?.itm_data[0]?.image_url_def ??
        data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1,
    );
  } catch (error) {
    redirect("/");
  }
}

export default function Page() {
  return <Home />;
}
