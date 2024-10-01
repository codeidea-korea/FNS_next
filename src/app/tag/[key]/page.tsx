import TagDetail from "@/page/etc/TagDetail";
import { notFound } from "next/navigation";
import { clearMetaText } from "@/utils/common";
import { makeMetadata } from "@/utils/metadata";
import { getApi } from "@/utils/apis";
import { Metadata } from "next";

interface Props {
  params: { key: string };
  searchParams?: { [key: string]: string | string[] | undefined };
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

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  if (!searchParams?.id) {
    notFound();
  }

  try {
    const { data } = await getApi<TagPreview>(
      `/api/v1/ui/view/tag_preview_name/${params.key}`,
    );
    const metaDescription = data.data ? getMetaDescription(data.data) : "";
    const tagId =
      data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.tag_id ?? "";

    return makeMetadata(
      decodeURIComponent(params.key) + " | 패션앤스타일 (Fashion & Style)" ??
        "",
      clearMetaText(metaDescription ?? ""),
      `https://www.fashionandstyle.com/tag/${decodeURIComponent(params.key)}?id=${tagId}`,
      data.data?.vw_groups[1]?.grp_items[0]?.itm_data[0]?.image_url_def ??
        data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1,
    );
  } catch (error) {
    notFound();
  }
}

export default function Page() {
  return <TagDetail />;
}
