import CategoryDetail from "@/page/etc/CategoryDetail";
import { redirect } from "next/navigation";
import { getApi } from "@/utils/apis";
import { Metadata } from "next";
import { clearMetaText } from "@/utils/common";

interface Props {
  params: { key: string };
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await getApi<TagPreview>(
      `/api/v1/ui/view/tag_preview_name/${params.key}`,
    );
    const metaDescription = data.data ? getMetaDescription(data.data) : "";

    return {
      title:
        decodeURIComponent(params.key) + " | 패션앤스타일 (Fashion & Style)" ??
        "",
      description: metaDescription,
      openGraph: {
        images:
          data.data?.vw_groups[1]?.grp_items[0]?.itm_data[0]?.image_url_def ??
          data.data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1,
      },
    };
  } catch (error) {
    redirect("/home/10001");
  }
}

export default function Page() {
  return <CategoryDetail />;
}
