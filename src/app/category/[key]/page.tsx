import CategoryDetail from "@/page/etc/CategoryDetail";
import { notFound } from "next/navigation";
import { getApi } from "@/utils/apis";
import { Metadata } from "next";
import { clearMetaText } from "@/utils/common";
import { makeMetadata } from "@/utils/metadata";

interface Props {
  params: { key: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

function getMetaDescription(tagPreview: TagPreview): string {
  let metaDesc = "";
  if (tagPreview && tagPreview.vw_groups?.length > 0) {
    const top5Data = tagPreview.vw_groups[2].grp_items[0].itm_data;

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
    const tagId =
      data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.tag_id ?? "";

    return makeMetadata(
      decodeURIComponent(params.key) + " | 패션앤스타일 (Fashion & Style)" ??
        "",
      data.data ? getMetaDescription(data.data) : "",
      decodeURIComponent(
        `https://fashionandstyle.com/category/${params.key}?id=${tagId}`,
      ),
      data.data?.vw_groups[1]?.grp_items[0]?.itm_data[0]?.image_url_def ??
        data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1,
    );
  } catch (error) {
    notFound();
  }
}

export default function Page() {
  return <CategoryDetail />;
}
