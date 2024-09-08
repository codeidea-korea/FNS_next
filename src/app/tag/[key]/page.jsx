import { clearMetaText } from "@/common/CommonUtils";
import TagDetail from "@/page/etc/TagDetail";

export async function generateMetadata({ params: { key } }) {
  try {
    const res = await AxiosInstance.get(
      `/api/v1/ui/view/tag_preview_name/${key}`
    );
    const data = res.data.data;

    let metaDesc = "";
    if (data && data.vw_groups?.length > 0) {
      const top5Data = data.vw_groups[2].grp_items[0].itm_data;

      top5Data.map((topData) => {
        metaDesc = metaDesc + topData.post_desc?.split("\n")[0] + " ";
      });

      metaDesc = clearMetaText(metaDesc);
    }

    return {
      title: key + " | 패션앤스타일 (Fashion & Style)" ?? "",
      description: metaDesc,
      image:
        data?.vw_groups[1]?.grp_items[0]?.itm_data[0]?.image_url_def ??
        data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1,
      date: data?.created_at ?? "",
    };
  } catch (error) {
    redirect("/home/10001");
  }
}

{
  /* <Metatag
            title={key + " | 패션앤스타일 (Fashion & Style)" ?? ""}
            desc={metaDesc ?? ""}
            image={
              data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url_def ??
              data?.vw_groups[0]?.grp_items[0]?.itm_data[0]?.image_url1
            }
            date={data?.created_at ?? ""}
          /> */
}

export default function Page() {
  return <TagDetail />;
}
