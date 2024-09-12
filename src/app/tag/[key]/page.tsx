import TagDetail from "@/page/etc/TagDetail";
import { redirect } from "next/navigation";
import { clearMetaText } from "@/utils/common";
import { makeMetadata } from "@/utils/metadata";
import { getApi } from "@/utils/apis";
import { Metadata } from "next";

interface Props {
  params: { key: string };
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
      `/api/v1/ui/view/tag_preview_name/${params.key}`,
    );
    const metaDescription = data.data ? getMetaDescription(data.data) : "";

    return makeMetadata(
      decodeURIComponent(params.key) + " | 패션앤스타일 (Fashion & Style)" ??
        "",
      clearMetaText(metaDescription ?? ""),
      `https://www.fashionandstyle.com/tag/${decodeURIComponent(params.key)}`,
      data.data?.vw_groups[1]?.grp_items[0]?.itm_data[0]?.image_url_def ??
        data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1,
      data.data?.created_at ?? "",
    );
  } catch (error) {
    redirect("/home/10001");
  }
}

export default function Page() {
  return <TagDetail />;
}
