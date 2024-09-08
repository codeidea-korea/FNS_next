import { clearMetaText } from "@/common/CommonUtils";
import PostDetail from "@/page/etc/PostDetail";

export async function generateMetadata({ params: { yy, mm, dd, key } }) {
  try {
    const res = await AxiosInstance.get(
      `/api/v1/post/preview_name/${yy}${mm}${dd}/${key}`
    );
    const data = res.data.data;
    const { post } = data;
    const { suggest } = data;

    let metaTitle = "";
    let metaDesc = "";
    if (post.post_images?.length > 0 && suggest?.vw_groups?.length > 0) {
      /* meta title */
      metaTitle = post.post_desc?.split("\n")[0];
      metaTitle =
        clearMetaText(metaTitle) + " | 패션앤스타일 (Fashion & Style)";

      /* meta desc */
      /* desc = post_desc 텍스트 전부 + 첫번째 태그 1번 포스트캡션 + 두번째 태그 1번 포스트캡션 */
      metaDesc = post.post_desc + " ";

      suggest.vw_groups.map((vwGroup, idx) => {
        if (idx < 2) {
          metaDesc =
            metaDesc +
            vwGroup?.grp_items[0]?.itm_data[0]?.post_desc?.split("\n")[0] +
            " ";
        }
      });

      metaDesc = clearMetaText(metaDesc);

      return {
        title: metaTitle,
        desc: metaDesc ?? "",
        image: post?.post_images[0]?.post_image_url,
        date: post?.created_at ?? "",
      };
    }
  } catch (error) {
    redirect("/home/10001");
  }
}

export default function Page() {
  return <PostDetail />;
}
